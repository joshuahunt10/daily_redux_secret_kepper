export const USER_LOGIN = 'USER_LOGIN'

export function userLogin(userID){
  return{
    type: USER_LOGIN,
    payload: userID
  }
}
