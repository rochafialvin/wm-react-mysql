const init = {
   id: "",
   username: ""
}

export default (state = init , action) => {
   switch(action.type) {
      case 'LOGIN_SUCCESS':
         return {...state, id: action.payload._id, username: action.payload.username}
      
      default :
         return state
   }
}