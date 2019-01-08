import React from "react";
import { createStore } from "redux";

export class TimeTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { timeTable: [1,2]};
    }

    render(){
        return(<div className="background">
            <h2 className="logo">Valamis cinema</h2>
            <div className="timeTable">
                { this.state.timeTable.map(item =>(
                    <div className="timetable-row" key={item}>       
                    item               
                    </div>
                ) )}
                
            </div>
        </div>)
    }
};

