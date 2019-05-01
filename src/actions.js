import { SAVE_MOVIE, BOOK_CHAIR, UNBOOK_CHAIR, CLEAR_BOOKED_CHAIRS} from "./action-types.js"

export function saveMovie(payload) {
    return { type: SAVE_MOVIE, payload };
};


export function bookChair(payload) {
    return { type: BOOK_CHAIR, payload };
};


export function unbookChair(payload) {
    return { type: UNBOOK_CHAIR, payload };
};

export function clearBookedChairs(payload) {
    return { type: CLEAR_BOOKED_CHAIRS, payload };
};
