import {ADD_TIMETABLEROW} from "./action-types.js"

export function addTimeTableRow(payload) {
    return { type: ADD_TIMETABLEROW, payload };
};