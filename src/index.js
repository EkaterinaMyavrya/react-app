import React from "react";
import ReactDOM from "react-dom";
import { TimeTable } from "./TimeTable.jsx";
import { Tickets } from "./Tickets.jsx";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

"use strict";


ReactDOM.render(
    <BrowserRouter>
        <div>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">Time Table</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link"  to="/book">Tickets</Link>
                    </li>
                </ul>
            </nav>

            <div className="background">
                <h2 className="logo">Valamis cinema</h2>
                <Switch>
                    <Route path="/" exact component={TimeTable} />
                    <Route path="/book" exact component={Tickets} />
                    <Route exact path="/book/:id" component={Tickets}
                    />
                </Switch>
            </div>
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);