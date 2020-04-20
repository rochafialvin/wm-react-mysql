import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom'


// Components
import Header from './Header';
import Register from './Register'
import Login from './Login'
import Home from './Home'

class App extends Component {
   render() {
      return(
        <BrowserRouter>
            <div>
               <Header/>
               <Route path="/" exact component={Home} />
               <Route path="/login" component={Login} />
               <Route path="/register" component={Register} />
            </div>
        </BrowserRouter>
      )
   }
}

export default App