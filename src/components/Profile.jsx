import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap'
import {connect} from 'react-redux'
import axios from '../config/axios';
import { Redirect } from 'react-router-dom';

class Profile extends Component {

   state = {
      user: {}
   }

   componentDidMount() {

      const config = { headers: { Authorization : this.props.token } }

      axios.get(`/user/profile`, config)
         .then(res => this.setState({user: res.data}))
         .catch(err => console.log({err}))
   }


   render() { 
      if(this.props.username){
         let {id, username, name , email, avatar} = this.state.user

         return (
            <div className="container">
               <Jumbotron>
                  <img src={avatar} alt={name}/>
                  <h1>Hello, {name}</h1>
                  <p>{username} | {name} | {email}</p>
               </Jumbotron>
            </div>
         );
      }

      return <Redirect to='/login'/>
   }
}

let mapStateToProps = state => {
   return {
      username: state.auth.username,
      token : state.auth.token
   }
}
 
export default connect(mapStateToProps)(Profile);