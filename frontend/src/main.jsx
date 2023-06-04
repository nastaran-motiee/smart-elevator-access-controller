import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import App from './components/App.jsx';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import {store} from "./store/index.js";


/**
 * Render the App component into the root of the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App/>

        </Router>
    </Provider>
);
