import { ADD_TIMETABLEROW } from "./action-types.js";
import { ADD_MOVIECHAIRROW } from "./action-types.js";

const initialState = {
    timeTableRows: [],
    movieChairsRows: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_TIMETABLEROW) {       
        return Object.assign({}, state, {
            timeTableRows: state.timeTableRows.concat(action.payload)
        });
    }    
    if (action.type === ADD_MOVIECHAIRROW) {
        return Object.assign({}, state, {
            movieChairsRows: state.movieChairsRows.concat(action.payload)
        });
    }    
    return state;
};

export default rootReducer;