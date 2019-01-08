import { ADD_TIMETABLE } from "./action-types.js"

const initialState = {
    timeTableRows: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_TIMETABLE) {
        return Object.assign({}, state, {timeTableRows: state.timeTableRows.concat(action.payload)});
    }
    return state;
};

export default rootReducer;