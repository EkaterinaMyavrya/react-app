import React from "react";
import store from "./store.js";
import { addMovieChairRow } from "./actions.js";
import {Chair} from "./Chair";
import { Button, Header, Grid, Container } from 'semantic-ui-react'


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
       this.getMovieName = this.getMovieName.bind(this);
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

    getMovieName(){
        const currentState = store.getState();
        if (currentState && currentState.movieName) {
            return currentState.movieName;
        }

        return '';
    }

    getMovieTime() {
        const currentState = store.getState();
        if (currentState && currentState.movieName) {
            return currentState.movieTime;
        }

        return '';
    }

    getMovieHall() {
        const currentState = store.getState();
        if (currentState && currentState.movieHall) {
            return currentState.movieHall;
        }

        return '';
    }

    render() {              
               var groupedByRowResult = [];
               if (this.state && this.state.movieChairsRows){
                   groupedByRowResult = groupByRow(this.state.movieChairsRows);
               }

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: "false",
            hour: "numeric",
            minute: "numeric"
        };

        var date = 
            new Date(
                Date.parse(this.getMovieTime())
            ).toLocaleDateString("en-US", options);
        
               return (
                   <Container text style={{ marginTop: '2em' }}>
                       <Header as='h3' textAlign='center' content={`Select chairs and book them:`} />
                       <Header as='h4' textAlign='left' content={`Movie: ${this.getMovieName()}`} />
                       <Header as='h4' textAlign='left' content={`Time: ${date}`} />
                       <Header as='h4' textAlign='left' content={`Hall: ${this.getMovieHall()}`} />

                       <Container style={{ marginTop: '2em' }}>
                           <Grid>                                    
                           {groupedByRowResult.map(arrayItem => (
                               <Grid.Row key={arrayItem[0].row}>
                                   <Grid.Column width="2">   
                                    {arrayItem[0].row} row 
                                    </Grid.Column>                            
                                   {arrayItem.map(rowSeat => (
                                       <Grid.Column>
                                           <Chair id={rowSeat.id} seat={rowSeat.seat} seatState = {rowSeat.state}/>                                        
                                       </Grid.Column>
                                   ))}
                              </Grid.Row> 
                               ))}
                       
                       </Grid>
                       </Container>
                       <Container style={{ marginTop: '2em' }} textAlign="center">                      
                           <Button onClick={this.bookChairs}>Book</Button>
                       </Container>
                    </Container>                   
               );
      }
};
