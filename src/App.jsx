import React from "react";
import { createStore } from "redux";

const actions = {
    "INC": state => state + 1,
    "DEC": state => state - 1,
};

const counter = (state=0, { type }) => {
    if (actions[type]) {
        console.log(state);
        return actions[type](state);
    } else {
        console.log(state);
        return state;
    }
};

const store = createStore(counter);

export class App extends React.Component {
    constructor(props) {
        
    }
};

export const App = ({ some }) => (
    <div className="App">
        <h1 id={`id_${some}`}> Hello, Philip! </h1>
        <div>{store.getState()}</div>
        <button onClick={() => store.dispatch({ type: "INC" })}>+</button>
        <button onClick={() => store.dispatch({ type: "DEC" })}>-</button>
    </div>
);

const counterComp = ({ val }) => (
    <div>
        <div>{val}</div>
        <button onClick={() => store.dispatch({ type: "INC" })}>+</button>
        <button onClick={() => store.dispatch({ type: "DEC" })}>-</button>
    </div>
);

// export default App;