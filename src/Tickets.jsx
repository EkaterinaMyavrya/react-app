import React from "react";
import store from "./store.js";
import { addMovieChairRow } from "./actions.js";
import {Chair} from "./Chair";

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
        this.state = {
                movieChairsRows: []
       };
       this.bookChairs = this.bookChairs.bind(this);
    }

    componentDidMount() {       
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

    bookChairs() {
      const currentState = store.getState();
      if (currentState && currentState.bookedChairs)
      {
          if (this.state && this.state.movieChairsRows) {
              let movieChairsRows = this.state.movieChairsRows;
              movieChairsRows.forEach(chair => {
                  if(currentState.bookedChairs.includes(chair.id)){
                        chair.state = "booked";
                  };
                })

              this.setState({ movieChairsRows: movieChairsRows });
          }

          fetch(`http://localhost:3000/bookTickets`,
              {
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify({ movieId: this.props.match.params.id, seatIds: currentState.bookedChairs})
              });
      }
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
                                   <h4> {arrayItem[0].row} row: </h4>                             
                                   {arrayItem.map(rowSeat => (
                                       <Chair id={rowSeat.id} seat={rowSeat.seat} seatState = {rowSeat.state}/>                                        
                                   ))}
                                </div>
                               ))}
                        </div>
                        <div className="order">
                                <button onClick={this.bookChairs}> Book </button>
                        </div>
                       </div>
                   
               );
    }         
};
