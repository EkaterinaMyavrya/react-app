import {ADD_TIMETABLE} from "./action-types.js"

export function addTimeTableRow(payload) {
    return { type: ADD_TIMETABLE, payload }
};