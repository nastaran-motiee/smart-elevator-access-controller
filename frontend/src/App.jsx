import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Controller from "./components/Controller/index.jsx";
import VideoCallPopup from "./components/VideoCallPopup/index.jsx";
import {Box, Container} from "@mui/material";
import {loadRegisteredUsers} from "./store/index.js";
import {useDispatch} from "react-redux";
import './styles/App.scss';


/**
 * App component is the main component of the application
 * and is used to render the application into the root.
 * @returns {JSX.Element}
 * @component
 *
 */
const App = () => {
    const [videoCall, setVideoCall] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRegisteredUsers());
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
                    <Route path='/' element={<Controller/>}/>
                </Routes>

            </Box>

            {videoCall}
        </Container>


    );
};

export default App;