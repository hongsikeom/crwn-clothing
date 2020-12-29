import { UserActionTypes } from './user.types';


// Initial state
const INITIAL_STATE = {
    currentUser: null
}


// This is a reducer - a function that takes a current state value and an
// action object describing "what happened", and returns a new state value.
// A reducer's function signature is: (state, action) => newState
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;