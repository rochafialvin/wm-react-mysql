import React, { Component } from 'react';
import axios from '../config/axios';

class Register extends Component {


   registerUser = (e) => {
      e.preventDefault()

      let username = this.username.value
      let name = this.name.value
      let email = this.email.value
      let password = this.password.value

      const body = {
         username, name, email, password
      }

      axios.post('/register', body)
         .then(res => {
            alert(res.data.message)
         })
         .catch(err => {
            alert(err.response.data.sqlMessage)
         })
  }

   render() { 
      return (
         <div className=" mt-5 row" >
            <div className="card col-sm-3 mx-auto" >
               <div className="card-body" >
                  <div className="border-bottom border-secondary card-title" >
                     <h1>Register</h1>
                  </div>
                  <form onSubmit={this.registerUser} className="form-group" >
                     <div>
                        <h4>username</h4>
                        <input className="form-control" ref={(input) => {this.username = input}} type="text"/>
                     </div>
                     <div>
                        <h4>name</h4>
                        <input className="form-control" ref={(input) => {this.name = input}} type="text"/>
                     </div>
                     <div>
                        <h4>email</h4>
                        <input className="form-control" ref={(input) => {this.email = input}} type="email"/>
                     </div>
                     <div>
                        <h4>password</h4>
                        <input className="form-control" ref={(input) => {this.password = input}} type="password"/>
                     </div>

                     <input onClick={this.registerUser} className="btn btn-block btn-outline-success mt-2" type="submit" value="Register"/>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}
 
export default Register;