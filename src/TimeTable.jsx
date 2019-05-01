import React from "react";
import store from "./store.js";
import { saveMovie } from "./actions.js";
import { Link, Route } from "react-router-dom";
import {   
    Container,
    Table,
    Header
} from 'semantic-ui-react';

export class TimeTable extends React.Component {
  
    constructor(props) {
        super(props);
        console.log("constructor called");
        this.state = {
            timeTableRows: []
        };

        this.saveMovieToStore = this.saveMovieToStore.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount called");
        this.loadData();
    }
    

    loadData() {
        fetch('http://localhost:3000/timetable')
            .then(response => response.json())
            .then(parsedJson => {          
                this.setState({ timeTableRows: parsedJson })
            });
    }

    saveMovieToStore(movie, e){
        if(movie)
        {
            store.dispatch(saveMovie(movie));
        }
    }

    render(){
        console.log("render called");       
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
                         
                {this.state &&
                    this.state.timeTableRows &&
                    this.state.timeTableRows.map(item => (
                     
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
                                <Link to={`/book/${item.id}`} onClick={(e) => this.saveMovieToStore(item, e)}>
                                    Book tickets
                                </Link>
                            </Table.Cell>                       
                         </Table.Row>
                    ))}
                    </Table.Body>
                    </Table>
                </Container>
            </Container>
        );
    }
};
