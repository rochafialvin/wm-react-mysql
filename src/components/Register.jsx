import React, { Component } from 'react';
import axios from '../config/axios';

class Register extends Component {


   registerUser = (e) => {
      e.preventDefault()
      let username = this.username.value
      let name = this.name.value
      let age = this.age.value
      let email = this.email.value
      let password = this.password.value

      axios.post('/users', {username, name, email, age, password})
         .then(res => {
            if(res.data.errmsg){
               let feedback = prompt('Masukkan feedback')
            }
         })
         .catch(err => {
            let feedback = prompt('Masukkan feedback')
         })
  }

   render() { 
      return (
         <form onSubmit={this.registerUser} >
            <div>
               username
               <input ref={(input) => {this.username = input}} type="text"/>
            </div>
            <div>
               name
               <input ref={(input) => {this.name = input}} type="text"/>
            </div>
            <div>
               age
               <input ref={(input) => {this.age = input}} type="number"/>
            </div>
            <div>
               email
               <input ref={(input) => {this.email = input}} type="email"/>
            </div>
            <div>
               password
               <input ref={(input) => {this.password = input}} type="password"/>
            </div>

            <input type="submit" value="Register"/>
         </form>
      );
   }
}
 
export default Register;