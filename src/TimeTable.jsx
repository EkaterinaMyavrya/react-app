import React from "react";
import { Link, Route } from "react-router-dom";
import {
    Container,
    Table,
    Header,
    Message
} from 'semantic-ui-react';
import { connect } from "react-redux";
import { getTimeTable, saveMovie } from './reduxStore/actions';


const mapStateToProps = state => {
    return {
        timeTableRows: state.timeTableRows,
        error: state.errorLoadingTimeTableRows
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveMovie: movie => dispatch(saveMovie(movie)),
        fetchData: () => dispatch(getTimeTable("http://localhost:3000/timetable"))
    };
}

class InnerTimeTable extends React.Component {

    componentDidMount() {
        this.props.fetchData();
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

        return (
            <Container text style={{ marginTop: '2em' }}>
                <Header as='h3' textAlign='center' content='Time Table' />
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Time</Table.HeaderCell>
                                <Table.HeaderCell>Movie</Table.HeaderCell>
                                <Table.HeaderCell>Hall</Table.HeaderCell>
                                <Table.HeaderCell>Link</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.timeTableRows.map(item => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        {new Date(
                                            Date.parse(item.datetime)
                                        ).toLocaleDateString("en-US", options)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.movie}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.hall}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/book/${item.id}`} onClick={(e) => this.props.saveMovie(item)}>
                                            Book tickets
                                    </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
                <Container style={{ marginTop: '2em' }} textAlign="center">
                    {this.props.error &&
                        <Message negative>
                            <Message.Header>We're sorry we can't show timetable</Message.Header>
                            <p>{this.props.error} Try again to get timetable.</p>
                        </Message>
                    }
                </Container>
            </Container>
        );
    }
};

const ConnectedTimeTable = connect(mapStateToProps, mapDispatchToProps)(InnerTimeTable);

// for routing
export class TimeTable extends React.Component {
    render() {
        return (
            <ConnectedTimeTable {...this.props} />
        )
    }
}
