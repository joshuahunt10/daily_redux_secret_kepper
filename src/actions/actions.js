import request from 'superagent'
import Cookies from 'js-cookie';

export const SET_TOKEN = 'SET_TOKEN'
export const USER = 'USER'

export function userLogin(userInfo){
  return{
    type: USER,
    payload: userInfo
  }
}

export function setToken(token){
  return{
    type: SET_TOKEN,
    payload: token
  }
}

export const login = (email, password, callback) => {
  return(dispatch, getState) =>{
    request
      .post('https://user-auth-test.herokuapp.com/login')
      .send({email: email, password: password})
      .end((err, res) =>{
        console.log(res.body)
        dispatch(setToken(res.body.auth_token))
        dispatch(directUserPage(res.body.auth_token))
        Cookies.set('token', res.body.auth_token, {expires: 7})
        callback()
      })
  }
}

const directUserPage = (token) =>{
  console.log('in the directUserPage function')
  return (dispatch, getState) => {
    // token = getState().auth_token
    console.log(token)
    //
    if(!token){
      return
    }
    request
      .get('https://user-auth-test.herokuapp.com/dashboard')
      .set('X-AUTH-TOKEN', token)
      .end((err, res) =>{
        console.log('res.body in the directUserPage',res.body);
        dispatch(userLogin({
          email: res.body.email,
          full_name: res.body.full_name,
          message: res.body.message
        }))
      })
  }
}
