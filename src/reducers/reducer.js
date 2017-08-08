import update from 'immutability-helper'
import {combineReducers} from 'redux'
import {USER_LOGIN} from '../actions/actions.js'


const reducer = combineReducers({
  user: userReducer
})

const userReducer = (state=[], action) =>{
  switch(action.type){
    case USER_LOGIN:
    return action.payload

    default:
    return state
  }
}

export default reducer;
