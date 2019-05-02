import React from "react";
import store from "./reduxStore/store.js";
import { bookChair, unbookChair } from "./reduxStore/actions.js";

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
        let chairClassName = "chair";

        if (this.props.seatState && this.props.seatState == "booked") {
            chairClassName = `${chairClassName} chair--state-busy`;
        }else
        {
            chairClassName = `${chairClassName} ${this.state && this.state.booked ? "chair--state-booked" : "chair--state-free"}`;
        }
        
        return (                
            <span className={chairClassName} key={this.props.id} onClick={this.handleClick}>                                     
                    {this.props.seat}
            </span>   
        );
    }         
};
