import React from "react";
import store from "./reduxStore/store.js";
import { bookChair, unbookChair } from "./reduxStore/actions.js";
import classnames  from "classnames";

export class Chair extends React.Component {
    constructor(props) {
        super(props);      
            this.state = {
                booked: false
            };
      
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.seatState && this.props.seatState != "booked"){
            if (this.state.booked) {
                store.dispatch(unbookChair(this.props.id));

            }
            else {
                store.dispatch(bookChair(this.props.id));
            }

            this.setState(state => ({booked: !state.booked}));          
        }
    }

    render() {     

        const seatState = this.props.seatState;
        const chairClassName = classnames({
            chair: true,
            'chair--state-busy': seatState == "booked",
            'chair--state-booked': seatState != "booked" && this.state.booked,
            'chair--state-free': seatState != "booked" && !this.state.booked
        });

        return (                
            <span className={chairClassName} key={this.props.id} onClick={this.handleClick}>                                     
                    {this.props.seat}
            </span>   
        );
    }         
};
