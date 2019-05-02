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

export function getTimeTable(url) {
    return dispatch =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(timeTableRows =>
                dispatch(timeTableFetchSuccess(timeTableRows))
            )
            .catch(err => {
                console.log(err);
                dispatch(timeTableLoadingFailed(err.message));
            });
}

export function getMovieChairs(url) {
    return dispatch =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response;
            })
            .then(response => response.json())
            .then(movieChairsRows =>
                dispatch(movieChairsFetchSuccess(movieChairsRows))
            )
            .catch(err => {
                console.log(err);
                dispatch(movieChairsLoadingFailed(err.message));
            });
}

export function bookChairs(
    bookChairsUrl,
    getMovieChairsUrl,
    movieId,
    bookedChairs
) {
    return dispatch =>
        fetch(bookChairsUrl, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ movieId: movieId, seatIds: bookedChairs })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                dispatch(clearBookedChairs());
                dispatch(getMovieChairs(getMovieChairsUrl));
            })
            .catch(err => {
                console.log(err);
                dispatch(bookChairsFailed(err.message));
            });
}

export function bookChairsFailed(payload) {
    return { type: BOOK_CHAIRS_FAILED, payload };
}

export function timeTableLoadingFailed(payload) {
    return { type: TIME_TABLE_LOADING_FAILED, payload };
}

export function timeTableFetchSuccess(payload) {
    return { type: TIME_TABLE_FETCH_SUCCESS, payload };
}

export function movieChairsLoadingFailed(payload) {
    return { type: MOVIE_CHAIRS_LOADING_FAILED, payload };
}

export function movieChairsFetchSuccess(payload) {
    return { type: MOVIE_CHAIRS_FETCH_SUCCESS, payload };
}

export function saveMovie(payload) {
    return { type: SAVE_MOVIE, payload };
}

export function bookChair(payload) {
    return { type: BOOK_CHAIR, payload };
}

export function unbookChair(payload) {
    return { type: UNBOOK_CHAIR, payload };
}

export function clearBookedChairs(payload) {
    return { type: CLEAR_BOOKED_CHAIRS, payload };
}
