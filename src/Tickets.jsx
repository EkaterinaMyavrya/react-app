import React from "react";
import store from "./store.js";
import { addTimeTableRow } from "./actions.js";

export class Tickets extends React.Component {
           constructor(props) {
               super(props);
               console.log("tickets constructor called");
               this.state = {
                   timeTableRows: []
               };
           }

           componentDidMount() {
               console.log("tickets componentDidMount called");
               this.loadData();
           }

           render() {
               console.log("tickets render called");

               return (
                   <div className="Tickets">
                       <h3> Tickets </h3>
                       id: {this.props.match.params.id}
                   </div>
               );
           }

           loadData() {
               fetch(
                   `{http://localhost:3000/bookTickets/${
                       this.props.match.params.id
                   }`
               )
                   .then(response => response.json())
                   .then(parsedJson => {
                       store.dispatch(addTimeTableRow(parsedJson));
                       this.setState({ timeTableRows: parsedJson });
                   });
           }
       };


