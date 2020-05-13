
// user = {id , username, token}
export const onLogin = (user) => {

   // simpan di local storage
   localStorage.setItem('user', JSON.stringify(user))

   // kirim ke reducer
   return {
      type: 'LOGIN_SUCCESS',
      payload: user
   }
}

export const onLogout = () => {

   localStorage.removeItem('user')

   return {
      type: 'LOGOUT_SUCCESS'
   }
}