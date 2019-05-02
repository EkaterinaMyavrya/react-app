import React from "react";
import {
    Header,
    Container,
    Menu,
    Image
} from 'semantic-ui-react';

import { TimeTable } from "./TimeTable.jsx";
import { Tickets } from "./Tickets.jsx";
import { About } from "./About.jsx";

import { Route, Switch, Link } from "react-router-dom";

export class App extends React.Component {
    render() {
        return (
            <Container>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as={Link} header to="/">
                            <Image src="./images/logo.jpg" size='mini' style={{ marginRight: '1.5em' }} />
                            Valamis cinema
                        </Menu.Item>
                        <Menu.Item as={Link} to="/">Time Table</Menu.Item>
                        <Menu.Item as={Link} to="/about"> About</Menu.Item>
                    </Container>
                </Menu>
                <Container text style={{ marginTop: '5em' }}>
                    <Header as='h1' content='Valamis cinema' textAlign='center' />
                </Container>
                <Switch>
                    <Route path="/" exact component={TimeTable} />
                    <Route path="/about" exact component={About} />
                    <Route path="/book/:id" exact component={Tickets} />
                </Switch>
            </Container>
        );
    }
};