import React from "react";
import { connect } from "react-redux";
import { getMovieChairs, clearBookedChairs, bookChairs } from './reduxStore/actions';
import { Button, Header, Grid, Container, Message, Divider } from 'semantic-ui-react'
import { Chair } from "./Chair";

const mapStateToProps = state => {
    return {
        movieChairsRows: state.movieChairs,
        bookedChairs: state.bookedChairs,
        error: state.errorLoadingChairs,
        movieName: state.movieName,
        movieTime: state.movieTime,
        movieHall: state.movieHall
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearBookedChairs: () => dispatch(clearBookedChairs()),
        bookChairs: (bookChairsUrl, getMovieChairsUrl, movieId, bookedChairs) => dispatch(bookChairs(bookChairsUrl, getMovieChairsUrl, movieId, bookedChairs)),
        fetchData: (url) => dispatch(getMovieChairs(url))
    };
}

function groupByRow(list) {
    return !list ? [] : list.reduce((res, item) => {
        res[item.row] = res[item.row] || [];
        res[item.row].push(item);
        return res;
    }, []);
}


class InnerTickets extends React.Component {
    constructor(props) {
        super(props);
        this.props.clearBookedChairs();
        this.generateGetMovieChairsUrl = this.generateGetMovieChairsUrl.bind(this);
    }

    generateGetMovieChairsUrl(){
      return  `http://localhost:3000/bookTickets/${
            this.props.match.params.id
            }`;
    }

    componentDidMount() {
        this.props.fetchData(this.generateGetMovieChairsUrl());
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
                Date.parse(this.props.movieTime)
            ).toLocaleDateString("en-US", options);

        return (
            <Container text style={{ marginTop: '2em' }}>
                <Container>
                    <Header as='h3' textAlign='center' content={`Select chairs and book them:`} />

                    <Grid divided>
                        <Grid.Row>
                            <b>Movie: </b>  {this.props.movieName}
                        </Grid.Row>
                        <Grid.Row>
                            <b>Time: </b> {date}
                        </Grid.Row>
                        <Grid.Row>
                            <b>Hall: </b>{this.props.movieHall}
                        </Grid.Row>
                    </Grid>
                </Container>

                <Container style={{ marginTop: '2em' }} textAlign="center">
                    Screen
                            <Divider />
                    <Grid>
                        {groupByRow(this.props.movieChairsRows).map(arrayItem => (
                            <Grid.Row key={arrayItem[0].row}>
                                <Grid.Column width="3" textAlign="right">
                                    Row {arrayItem[0].row}
                                </Grid.Column>
                                {arrayItem.map(rowSeat => (
                                    <Grid.Column key={rowSeat.id}>
                                        <Chair id={rowSeat.id} seat={rowSeat.seat} seatState={rowSeat.state} />
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
                    <Button onClick={() => {
                        this.props.bookChairs(`http://localhost:3000/bookTickets`, this.generateGetMovieChairsUrl(), this.props.match.params.id, this.props.bookedChairs)
                    }}>Book</Button>
                </Container>

                <Container style={{ marginTop: '2em' }} textAlign="center">
                    {this.props.error &&
                        <Message negative>
                            <Message.Header>We're sorry we can't book these chairs</Message.Header>
                            <p>{this.props.error}</p>
                        </Message>
                    }
                </Container>
            </Container>
        );
    }
};

const ConnectedTickets = connect(mapStateToProps, mapDispatchToProps)(InnerTickets);
// for routing
export class Tickets extends React.Component {
    render() {
        return (
            <ConnectedTickets {...this.props} />
        )
    }
}
