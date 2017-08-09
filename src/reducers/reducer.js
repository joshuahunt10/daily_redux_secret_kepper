import update from 'immutability-helper'
import {combineReducers} from 'redux'
import {USER, SET_TOKEN} from '../actions/actions.js'

const initialState={
  token: null,
  user: null
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case USER:
    return update(state, {
      user: {
        $set: action.payload
      }
    })

    case SET_TOKEN:
    return update(state, {
      token:{
        $set: action.payload
      }
    })

    default:
    return state
  }
}


const reducer = combineReducers({
  user: userReducer
})


export default reducer;
