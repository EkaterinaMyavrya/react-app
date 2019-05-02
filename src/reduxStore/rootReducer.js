import { SAVE_MOVIE, BOOK_CHAIR, UNBOOK_CHAIR, CLEAR_BOOKED_CHAIRS } from "./actionTypes.js";

const identity = state => state;

const saveMovie = (state, payload) =>
{
    const {movie, datetime, hall} = payload;
    return {
        ...state,
        movieName: movie,
        movieTime: datetime,
        movieHall: hall
    };
};

const bookChair = (state, chair) => ({ ...state, bookedChairs: state.bookedChairs.concat(chair)});

const unBookChair = (state, chair) => ({
    ...state, 
    bookedChairs: state.bookedChairs.filter((val, index, arr) => val != chair)});

const clearBookedChairs = (state, payload) => ({...state, bookedChairs: []});

const reducers = {
    [SAVE_MOVIE]: saveMovie,
    [BOOK_CHAIR]: bookChair,
    [UNBOOK_CHAIR]: unBookChair,
    [CLEAR_BOOKED_CHAIRS]: clearBookedChairs
};


const initialState = {
    movieName: '',
    movieTime: '',
    movieHall: '',
    bookedChairs: []
};

const rootReducer = (state = initialState, action) => {
        const reducer = reducers[action.type] || identity;
        return reducer(state, action.payload);
    };

export default rootReducer;