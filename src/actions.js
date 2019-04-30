import { ADD_TIMETABLEROW, ADD_MOVIECHAIRROW, BOOK_CHAIR, UNBOOK_CHAIR} from "./action-types.js"

export function addTimeTableRow(payload) {
    return { type: ADD_TIMETABLEROW, payload };
};

export function addMovieChairRow(payload) {
    return { type: ADD_MOVIECHAIRROW, payload };
};


export function bookChair(payload) {
    return { type: BOOK_CHAIR, payload };
};


export function unbookChair(payload) {
    return { type: UNBOOK_CHAIR, payload };
};