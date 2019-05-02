import React from "react";
import { connect } from "react-redux";
import { unbookChair, bookChair } from './reduxStore/actions';
import classnames from "classnames";

const mapDispatchToProps = (dispatch) => {
    return {
        unbookChair: (id) => dispatch(unbookChair(id)),
        bookChair: (id) => dispatch(bookChair(id))
    };
}


class InnerChair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booked: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.seatState && this.props.seatState != "booked") {
            if (this.state.booked) {
                this.props.unbookChair(this.props.id);

            }
            else {
                this.props.bookChair(this.props.id);
            }

            this.setState(state => ({ booked: !state.booked }));
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



const ConnectedChair = connect(null, mapDispatchToProps)(InnerChair);
// for routing
export class Chair extends React.Component {   
    render() {
        return (
            <ConnectedChair {...this.props} />
        )
    }
}
