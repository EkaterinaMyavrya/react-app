import React from "react";
import ReactDOM from "react-dom";
import { TimeTable } from "./TimeTable.jsx";
import { Tickets } from "./Tickets.jsx";
import { About } from "./About.jsx";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {
    Header,
    Container,
    Menu,
    Image
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

"use strict";


ReactDOM.render(
    <BrowserRouter>        
           
        <Menu fixed='top' inverted>
        <Container>
            <Link to="/">
                <Menu.Item as='a' header>          
                        <Image src="./images/logo.jpg" size='mini' style={{ marginRight: '1.5em' }} />
                        Valamis cinema                   
                </Menu.Item> 
            </Link>
            <Link to="/"> 
             <Menu.Item as='a'>Time Table</Menu.Item> 
            </Link>
            <Link to="/about">  
                 <Menu.Item as='a'> About</Menu.Item>
             </Link>
            </Container>
         </Menu>
         
        <Container  text style={{ marginTop: '5em' }}>
                <Header as='h1' content='Valamis cinema' textAlign='center' />
        </Container>

                <Switch>
                    <Route path="/" exact component={TimeTable} />
                    <Route path="/about" exact component={About} />
                    <Route exact path="/book/:id" component={Tickets}
                    />
                </Switch>            
        
    </BrowserRouter>,
    document.getElementById("root")
);