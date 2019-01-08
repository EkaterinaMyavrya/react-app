import React from "react";
import { createStore } from "redux";

export class Seats extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [
            { row: 1, seat: 1, state: "busy" },
             { row: 1, seat: 2, state: "free" }, 
             { row: 1, seat: 3, state: "booked" }, 
             { row: 2, seat: 1, state: "busy" }, 
             { row: 2, seat: 2, state: "free" }, 
             { row: 2, seat: 3, state: "booked" }, 
             { row: 3, seat: 1, state: "busy" }, 
             { row: 3, seat: 2, state: "free" }, 
             { row: 3, seat: 3, state: "booked" }] };
    }

    render(){
        return(<div className="background">
            <h2 className="logo">Valamis cinema</h2>
            <div className="chairs">
                { groupBy(this.state.items).map(item =>(
                    <div className="seat-row">
                        {item.seats.map(seat =>
                            <div className={"chair chair--state-" + seat.state} >                            
                                {seat.seat}
                            </div>
                        )}
                    </div>
                ) )}
                
            </div>
        </div>)
    }
};

function groupBy(list)
{
    var arr = Object.values(
    list.reduce((result, { row, seat, state }) => {
        // Create new group
        if (!result[row])
            result[row] = {
                row,
                seats: []
            };
        // Append to group
        result[row].seats.push({
            seat,
            state
        });

        return result;
        }, {})
    );

    return arr;
}

