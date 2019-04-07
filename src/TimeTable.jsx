import React from "react";
import store from "./store.js";
import { addTimeTableRow } from "./actions.js";
import { Link, Route } from "react-router-dom";
import Tickets from "./Tickets";

export class TimeTable extends React.Component {
  
    constructor(props) {
        super(props);
        console.log("constructor called");
        this.state = {
            timeTableRows: []
        };
    }

    componentDidMount() {
        console.log("componentDidMount called");
        this.loadData();
    }
    

    loadData() {
        fetch('http://localhost:3000/timetable')
            .then(response => response.json())
            .then(parsedJson => {
                store.dispatch(addTimeTableRow(parsedJson));
                this.setState({ timeTableRows: parsedJson })
            });
    }

    render(){
        console.log("render called");       
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: "false",
            hour: "numeric",
            minute: "numeric"
        };
        return (
            <div className="timeTable">
                {this.state &&
                    this.state.timeTableRows &&
                    this.state.timeTableRows.map(item => (
                        <div className="timetable-row" key={item.id}>
                            <span className="movie-time">
                                {new Date(
                                    Date.parse(item.datetime)
                                ).toLocaleDateString("en-US", options)}
                            </span>
                            <span className="movie-name">
                                {item.movie}
                            </span>
                            <span className="movie-hall">
                                {item.hall}
                            </span>
                            <span className="movie-book">
                                <Link to={`/book/${item.id}`}>
                                    Book tickets
                                </Link>
                            </span>                          
                        </div>
                    ))}
            </div>
        );
    }
};
