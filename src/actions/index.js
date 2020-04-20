
export const onLogin = (user) => {

   localStorage.setItem('user', JSON.stringify({...user}))

   return {
      type: 'LOGIN_SUCCESS',
      payload: {...user}
   }
}

export const onLogout = () => {
   return {
      type: 'LOGOUT_SUCCESS'
   }
}