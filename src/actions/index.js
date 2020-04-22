
export const onLogin = (user) => {

   localStorage.setItem('user', JSON.stringify({...user}))

   return {
      type: 'LOGIN_SUCCESS',
      payload: {...user}
   }
}

export const onLogout = () => {

   localStorage.removeItem('user')

   return {
      type: 'LOGOUT_SUCCESS'
   }
}