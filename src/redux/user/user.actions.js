import { UserActionTypes } from './user.types';

// payload
// naming convention for the property that holds the actual data in a Redux action object.
// This is a generally accepted convention to have a type
// and a payload for an action. The payload can be any valid JS type ( array , object, etc ).
export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})