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
            <div className="Tickets">
                <h3> Tickets </h3>

               
            </div>
        );
    }
};
/*

<Route path={`${match.path}/:id`} component={Topic} /
*/