import {
    SAVE_MOVIE,
    BOOK_CHAIR,
    UNBOOK_CHAIR,
    CLEAR_BOOKED_CHAIRS,
    TIME_TABLE_LOADING_FAILED,
    TIME_TABLE_FETCH_SUCCESS,
    MOVIE_CHAIRS_LOADING_FAILED,
    MOVIE_CHAIRS_FETCH_SUCCESS,
    BOOK_CHAIRS_FAILED
} from "./actionTypes.js";

const identity = state => state;

const saveMovie = (state, payload) => {
    const { movie, datetime, hall } = payload;
    return {
        ...state,
        movieName: movie,
        movieTime: datetime,
        movieHall: hall
    };
};

const bookChair = (state, chair) => ({
    ...state,
    bookedChairs: state.bookedChairs.concat(chair)
});

const unBookChair = (state, chair) => ({
    ...state,
    bookedChairs: state.bookedChairs.filter((val, index, arr) => val != chair)
});

const clearBookedChairs = (state, payload) => ({
    ...state,
    bookedChairs: [],
    errorBookingChairs: ""
});

const timeTableLoadingFailed = (state, payload) => ({
    ...state,
    errorLoadingTimeTableRows: payload
});
const timeTableFetch = (state, payload) => ({
    ...state,
    timeTableRows: payload,
    errorLoadingTimeTableRows: ""
});

const movieChairsLoadingFailed = (state, payload) => ({
    ...state,
    errorLoadingChairs: payload
});
const movieChairsFetch = (state, payload) => ({
    ...state,
    movieChairs: payload,
    errorLoadingChairs: ""
});

const bookChairFailed = (state, payload) => ({
    ...state,
    errorBookingChairs: payload
});

const reducers = {
    [SAVE_MOVIE]: saveMovie,
    [BOOK_CHAIR]: bookChair,
    [UNBOOK_CHAIR]: unBookChair,
    [CLEAR_BOOKED_CHAIRS]: clearBookedChairs,
    [TIME_TABLE_LOADING_FAILED]: timeTableLoadingFailed,
    [TIME_TABLE_FETCH_SUCCESS]: timeTableFetch,
    [MOVIE_CHAIRS_FETCH_SUCCESS]: movieChairsFetch,
    [MOVIE_CHAIRS_LOADING_FAILED]: movieChairsLoadingFailed,
    [BOOK_CHAIRS_FAILED]: bookChairFailed
};

const initialState = {
    movieName: "",
    movieTime: "",
    movieHall: "",
    bookedChairs: [],
    movieChairs: [],
    errorLoadingChairs: "",
    errorLoadingTimeTableRows: "",
    errorBookingChairs: "",
    timeTableRows: []
};

const rootReducer = (state = initialState, action) => {
    const reducer = reducers[action.type] || identity;
    return reducer(state, action.payload);
};

export default rootReducer;
