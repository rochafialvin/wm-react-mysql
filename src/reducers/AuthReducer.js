const init = {
   id: "",
   username: "",
   token : ""
}


export default (state = init , action) => {
   switch(action.type) {
      case 'LOGIN_SUCCESS':
         return {...state, id: action.payload.id, username: action.payload.username, token : action.payload.token}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}