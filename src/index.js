import React from "react";
import ReactDOM from "react-dom";
import { TimeTable } from "./TimeTable.jsx";
import store from "./store.js";
import { addTimeTableRow } from "./actions.js";

"use strict";



fetch('https://localhost:3000/timetable')
    .then(function (response) {
        const json = response.json();
        store.dispatch(addTimeTableRow(json));
    });
    


ReactDOM.render(<TimeTable some={1} />, document.getElementById("root"));