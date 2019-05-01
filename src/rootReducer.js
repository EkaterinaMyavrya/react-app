import {  SAVE_MOVIE, BOOK_CHAIR, UNBOOK_CHAIR } from "./action-types.js";

const initialState = {
    movieName: '',
    movieTime: '',
    movieHall: '',
    bookedChairs: []
};

function rootReducer(state = initialState, action) {
    if(action.type == SAVE_MOVIE)
    {
        return Object.assign({}, state, {
            movieName: action.payload.movie, 
            movieTime: action.payload.datetime,
            movieHall: action.payload.hall
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