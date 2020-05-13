import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import axios from '../config/axios'

import {onLogin} from '../actions'

class Login extends Component {

    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        const body = {username, password}

        axios.post('/user/login', body)
         .then(res => {
            
            
            this.props.onLogin({
                id: res.data.user.id,
                username: res.data.user.username,
                token: res.data.token
            })
            
         })
         .catch(err => console.log({err}))
    }

    render() {
        if(!this.props.username){
            return (
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Login</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.username = input} className="form-control" type="text"/></form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password"/></form>
                            <div className="d-flex justify-content-center my-3">
                                <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Login</button>
                            </div>
                            {/* {this.onErrorLogin()} */}
                            <p className="lead">Don't have account ? <Link to="/register">Sign Up!</Link></p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {onLogin})(Login)