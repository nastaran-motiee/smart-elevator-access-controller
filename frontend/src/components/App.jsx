import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import '../styles/App.scss';
import FaceDetector from "./FaceDetector.jsx";
import Siri from './Siri.jsx';
import VideoCallPopup from "./VideoCallPopup/index.jsx";
import {Box, Container} from "@mui/material";
import {loadRegisteredUsers} from "../store/index.js";
import {useDispatch, useSelector} from "react-redux";


/**
 * App component is the main component of the application
 * and is used to render the application into the root.
 * @returns {JSX.Element}
 * @component
 *
 */
const App = () => {
    const [videoCall, setVideoCall] = useState(null);
    // const {registeredUsers, fetchRegisteredUsers} = useContext(RegisteredUsersContext);
    const dispatch = useDispatch();
    const registeredUsers = useSelector(state => state.contactList.registeredUsers);

    useEffect(() => {
        console.log("App is running");

        // Ask for registered users from server
        dispatch(loadRegisteredUsers());

        return () => {
            console.log(registeredUsers)
        }
    }, []);


    /**
     * Handles the visibility of the video call popup
     * @param event
     */
    const handleVideoVisibility = (event) => {
        setVideoCall(videoCall ? null : <VideoCallPopup/>);
        requestPermissionToSendNotification();

    };

    /**
     * Request permission from user to send notifications
     */
    function requestPermissionToSendNotification() {
        console.log("Requesting permission...");
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    }


    return (

        <Container className="App" onClick={handleVideoVisibility}>
            <Box>
                <Routes>
                    <Route path='/' element={<FaceDetector/>}/>
                </Routes>

            </Box>

            {videoCall}
        </Container>


    );
};

export default App;