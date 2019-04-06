import React from "react";
import store from "./store.js";
import { addTimeTableRow } from "./actions.js";

export class Tickets extends React.Component {
  
    constructor(props) {
        super(props);
        console.log("constructor called");
        this.state = {
            timeTableRows: []
        };
    }


    render(){
        console.log("render called");       
        
        return (
            <div className="background">
                <h2 className="logo">Valamis cinema</h2>
                <h3> Tickets </h3>
            </div>
        );
    }
};


