import React from "react";
import { createStore } from "redux";

export class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        this.props.store = [];
    }

    render(){
        return(<div className="background">
            <h2 className="logo">Valamis cinema</h2>
            <div className="timeTable">
            
                {this.props.store.timeTableRows.map(item =>(
                    <div className="timetable-row" key={item}>       
                    item.datetime item.movie item.hall             
                    </div>
                ) )}
                
            </div>
        </div>)
    }
};

