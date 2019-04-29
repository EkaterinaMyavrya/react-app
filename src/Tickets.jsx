import React from "react";
import store from "./store.js";
import { addMovieChairRow } from "./actions.js";


function groupByRow(list) {
    

    const result = list.reduce(function (res, item) {
        res[item.row] = res[item.row] || [];
        res[item.row].push(item);
        return res;
    }, []);
    return result;
}

export class Tickets extends React.Component {
    constructor(props) {
        super(props);
        console.log("tickets constructor called");
            this.state = {
                movieChairsRows: []
            };
    }

    componentDidMount() {
        console.log("tickets componentDidMount called");
        this.loadData();
    }

    loadData() {
        fetch(
            `http://localhost:3000/bookTickets/${
            this.props.match.params.id
            }`
        )
        .then(response => response.json())
        .then(parsedJson => {
                store.dispatch(addMovieChairRow(parsedJson));
                this.setState({ movieChairsRows: parsedJson });
        });
    }

    render() {
               console.log("tickets render called");
               var groupedByRowResult = [];
               if (this.state && this.state.movieChairsRows){
                   groupedByRowResult = groupByRow(this.state.movieChairsRows);
               }

               return (
                   <div className="tickets">
                       <h3> Tickets </h3>
                       <div className="chairs"> 
                           {groupedByRowResult.map(arrayItem => (
                               <div className="seat-row" key={arrayItem[0].row}>                                
                                   {arrayItem.map(rowSeat => (
                                       <span className="chair chair--state-free" key={rowSeat.id}>
                                           {console.log(rowSeat.id)}
                                           {rowSeat.seat}
                                       </span>
                                   ))}
                                </div>
                               ))}
                        </div>
                       </div>
                   
               );
    }         
};
