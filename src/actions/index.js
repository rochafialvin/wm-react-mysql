
export const onLogin = (user) => {
   return {
      type: 'LOGIN_SUCCESS',
      payload: {...user}
   }
}