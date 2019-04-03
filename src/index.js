import React from "react";
import ReactDOM from "react-dom";
import { TimeTable } from "./TimeTable.jsx";
import store from "./store.js";
import { addTimeTableRow } from "./actions.js";
import rootReducer from "./rootReducer.js";

"use strict";

fetch('http://localhost:3000/timetable')
    .then(function (response) {      
        response.json().then(function (parsedJson) {
            store.dispatch(addTimeTableRow(parsedJson));
        })
    });
    
// todo: pass timetable to react component
ReactDOM.render(
    <TimeTable store={store} />,
    document.getElementById("root")
);