import React from "react";
import {Box, Grid, styled} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {db} from "../../firebase_module";
import "../../styles/VideoCallPage.css";
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import StyledGridItem from "../themed_components/StyledGridItem.jsx";


/**
 * Video Calling Page using WebRTC
 * @returns {JSX.Element}
 * @constructor
 */
function VideoCallPage() {
    const webcamButton = useRef(null);
    const webcamVideo = useRef(null);
    const callButton = useRef(null);
    const callInput = useRef(null);
    const answerButton = useRef(null);
    const remoteVideo = useRef(null);
    const hangupButton = useRef(null);
    const [callButtonIsEnabled, setCallButtonIsEnabled] = useState(false);
    const [answerButtonIsEnabled, setAnswerButtonIsEnabled] = useState(false);
    const [webcamButtonIsEnabled, setWebcamButtonIsEnabled] = useState(true);
    const [hangupButtonIsEnabled, setHangupButtonIsEnabled] = useState(false);
    const [callInputValue, setCallInputValue] = useState("");

    let localStream = null;
    let remoteStream = null;

    // server config
    const servers = {
        iceServers: [
            {
                urls: [
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                ], // free stun server
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const [pc, setPc] = useState(new RTCPeerConnection(servers));

    useEffect(() => {
        console.log("Peer Connection Created");
        startWebCam();
    }, []);

    /**
     * Handles the click event of the webcam button
     * @returns {Promise<void>}
     */
    const startWebCam = async () => {
        console.log("Webcam Button Clicked");
        // setting local stream to the video from our camera

        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        // Pushing tracks from local stream to peerConnection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // displaying the video data from the stream to the webpage
        webcamVideo.current.srcObject = localStream;

        // initalizing the remote server to the mediastream
        remoteStream = new MediaStream();

        remoteVideo.current.srcObject = remoteStream;

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                console.log("Adding track to remoteStream", track);
                remoteStream.addTrack(track);
            });
            remoteVideo.current.srcObject = remoteStream;
        };

        // enabling and disabling interface based on the current condition
        setCallButtonIsEnabled(true);
        setAnswerButtonIsEnabled(true);
        setWebcamButtonIsEnabled(false);
    };

    /**
     * Handles the click event of the call button
     * @param calleeId - uid of the user to call - the uid is the UserUID of the user who signed up in the app in firebase
     * @returns {Promise<void>}
     */
    const startCallWithUser = async (calleeId) => {
        console.log("Call Button Clicked");

        // referencing model_firebase collections
        //const callDoc = db.collection("calls").doc();
        //TODO: change the uid to the uid of the user to call
        const callDoc = doc(collection(db, "calls"), "LS0w3t6T5ZbMVG2IlXghC6HdGti2"); // Main collection in firestore
        const offerCandidates = collection(callDoc, "offerCandidates"); //Sub collection of callDoc
        const answerCandidiates = collection(callDoc, "answerCandidates"); //Sub collection of callDoc

        setCallInputValue(callDoc.id); // setting the input value to the calldoc id

        // get candidates for caller and save to db
        pc.onicecandidate = (event) => {
            event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
        };

        // create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        // config for offer
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        //await callDoc.set({ offer });
        await setDoc(callDoc, {offer}); // setting the offer to the callDoc

        // listening to changes in firestore and update the streams accordingly
        onSnapshot(callDoc, (snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }

            // if answered add candidates to peer connection
            onSnapshot(answerCandidiates, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(change.doc.data());
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        });

        setHangupButtonIsEnabled(true);
    };

    const handleAnswerButtonClick = async () => {
        const callId = callInput.current.value;

        // getting the data for this particular call
        const callDoc = doc(collection(db, "calls"), callId);
        const answerCandidates = collection(callDoc, "answerCandidates");
        const offerCandidates = collection(callDoc, "offerCandidates");

        // here we listen to the changes and add it to the answerCandidates
        pc.onicecandidate = (event) => {
            event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
        };

        const callData = (await getDoc(callDoc)).data();

        // setting the remote video with offerDescription
        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        // setting the local video as the answer
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answerDescription));

        // answer config
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, {answer});

        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    };

    return (
        <Box className={"webrtc-video-calling-app"} sx={{height: "100%", width: "100%"}}
             onClick={(event) => event.stopPropagation()}>
            <Grid container style={{height: "100%", margin: 0}}>
                <StyledGridItem item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <video
                        id="webcamVideo"
                        autoPlay
                        playsInline
                        ref={webcamVideo}
                    ></video>
                </StyledGridItem>
                <StyledGridItem item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <video
                        id="remoteVideo"
                        autoPlay
                        playsInline
                        ref={remoteVideo}
                    ></video>
                </StyledGridItem>

                <Grid container style={{position: "fixed", bottom: 0, marginBottom: "1rem"}}>
                    <Grid item xs={6} sx={{textAlign: "center"}}>
                        <button
                            id="callButton"
                            onClick={startCallWithUser}
                            ref={callButton}
                            disabled={!callButtonIsEnabled}
                        >
                            Create Call (offer)
                        </button>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "center"}}>
                        <div>
                            <button
                                id="hangupButton"
                                disabled={!hangupButtonIsEnabled}
                                ref={hangupButton}
                            >
                                Hangup
                            </button>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}


export default VideoCallPage;
