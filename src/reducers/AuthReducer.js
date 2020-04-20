const init = {
   _id: "",
   username: ""
}

export default (state = init , action) => {
   switch(action.type) {
      case 'LOGIN_SUCCESS':
         return {...state, _id: action.payload._id, username: action.payload.username}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}