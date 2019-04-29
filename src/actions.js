import {ADD_TIMETABLEROW} from "./action-types.js"
import { ADD_MOVIECHAIRROW } from "./action-types.js"

export function addTimeTableRow(payload) {
    return { type: ADD_TIMETABLEROW, payload };
};

export function addMovieChairRow(payload) {
    return { type: ADD_MOVIECHAIRROW, payload };
};