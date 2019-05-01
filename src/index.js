import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';

"use strict";


ReactDOM.render(
    <BrowserRouter> 
       <App/>         
    </BrowserRouter>,
    document.getElementById("root")
);