import React from "react";
import store from "./reduxStore/store.js";
import { clearBookedChairs } from "./reduxStore/actions.js";
import { Chair } from "./Chair";
import { Button, Header, Grid, Container, Message, Divider } from 'semantic-ui-react'


function groupByRow(list) {  
    return list.reduce((res, item) => {
        res[item.row] = res[item.row] || [];
        res[item.row].push(item);
        return res;
    }, []);
}

export class Tickets extends React.Component {
    constructor(props) {
        super(props);       
        this.state = {
                movieChairsRows: [],
                error: null
       };

       this.bookChairs = this.bookChairs.bind(this);
       this.getMovieName = this.getMovieName.bind(this);
       store.dispatch(clearBookedChairs());
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
        .then(response =>{
            if (response.ok) { return response.json();}
            throw new Error("Server returned error.");
        })
        .then(movieChairsRows => {               
                this.setState({ movieChairsRows: movieChairsRows });
        }).catch (err => {
                console.log(err);
                this.setState({ error: err.message });
            });
    }

    bookChairs() {
      const currentState = store.getState();
      if (currentState && currentState.bookedChairs)
      {
          if (this.state.movieChairsRows) {
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
              }).then(response =>{ 
                  if(response.ok)
                   {
                        store.dispatch(clearBookedChairs());
                   }
                   else{
                      throw new Error("Server returned error.");
                   }
                }
              )
              .catch(err => {
                  console.log(err);
                  this.setState({ error: err.message });
            });
        }
    }

    getMovieName(){
        return store.getState().movieName;       
    }

    getMovieTime() {
        return store.getState().movieTime;
    }

    getMovieHall() {
        return store.getState().movieHall;       
    }

    render() {              
               
        const options = {          
            month: "long",
            day: "numeric",
            hour12: "false",
            hour: "numeric",
            minute: "numeric",
            weekday: "short"
        };

        const date = 
            new Date(
                Date.parse(this.getMovieTime())
            ).toLocaleDateString("en-US", options);
        
               return (
                   <Container text style={{ marginTop: '2em' }}>
                        <Container>
                           <Header as='h3' textAlign='center' content={`Select chairs and book them:`} />       

                           <Grid divided>                             
                               <Grid.Row>
                                   <b>Movie: </b>  {this.getMovieName()}
                                </Grid.Row>
                               <Grid.Row>
                                    <b>Time: </b> {date}
                                </Grid.Row>
                               <Grid.Row>
                                     <b>Hall: </b>{this.getMovieHall()}
                                </Grid.Row>
                           </Grid>
                       </Container>
                        
                        <Container style={{ marginTop: '2em' }} textAlign="center">                         
                            Screen
                            <Divider />                            
                           <Grid>                                    
                            {groupByRow(this.state.movieChairsRows).map(arrayItem => (
                               <Grid.Row key={arrayItem[0].row}>
                                   <Grid.Column width="3" textAlign="right">   
                                    Row {arrayItem[0].row} 
                                    </Grid.Column>                            
                                   {arrayItem.map(rowSeat => (
                                       <Grid.Column key={rowSeat.id}>
                                           <Chair id={rowSeat.id} seat={rowSeat.seat} seatState = {rowSeat.state}/>                                        
                                       </Grid.Column>
                                   ))}

                                   <Grid.Column width="3" textAlign="left">
                                      Row {arrayItem[0].row} 
                                    </Grid.Column>                   
                              </Grid.Row> 
                               ))}                       
                          </Grid>
                        </Container>

                       <Container style={{ marginTop: '2em' }} textAlign="center">                                
                           <Button onClick={this.bookChairs}>Book</Button>
                       </Container>

                       <Container style={{ marginTop: '2em' }} textAlign="center">        
                       {this.state && this.state.error &&
                            <Message negative>
                            <Message.Header>We're sorry we can't book these chairs</Message.Header>
                                <p>{this.state.error}</p>
                            </Message>
                       }
                       </Container>
                    </Container>                   
               );
      }
};
