import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


// Components
import Header from './Header';
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import EditProfile from './EditProfile'
import NotFound from './NotFound'

// Actions
import {onLogin} from '../actions/index'

class App extends Component {

   state = {
      check : false
   }

   componentDidMount() {
      let user = JSON.parse(localStorage.getItem('user'))

      if(user){
         this.props.onLogin(user)
      }

      this.setState({check: true})
   }
   
   render() {
      if(this.state.check){
         return(
            <BrowserRouter>
                <div>
                  <Header/>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/login" component={Login} />
                     <Route path="/register" component={Register} />
                     <Route path="/profile" component={Profile} />
                     <Route path="/editprofile" component={EditProfile} />
                     <Route component={NotFound} />
                  </Switch>
                </div>
            </BrowserRouter>
          )
      }

      return <h1>Loading</h1>
   }
}

export default connect(null, {onLogin})(App)