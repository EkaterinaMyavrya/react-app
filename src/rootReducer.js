import { ADD_TIMETABLEROW, ADD_MOVIECHAIRROW, BOOK_CHAIR, UNBOOK_CHAIR } from "./action-types.js";

const initialState = {
    timeTableRows: [],
    movieChairsRows: [],
    bookedChairs: []
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
    if(action.type == BOOK_CHAIR){
        return Object.assign({}, state, {
            bookedChairs: state.bookedChairs.concat(action.payload)
        });
    }

    if (action.type == UNBOOK_CHAIR) {
        return Object.assign({}, state, {
            bookedChairs: state.bookedChairs.filter((val, index, arr) => val != action.payload)
        });
    }
    return state;
};

export default rootReducer;