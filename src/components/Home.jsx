import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from '../config/axios'
import { Redirect } from 'react-router-dom';

class Home extends Component {

   state = {
      todos : []
   }

   componentDidMount() {
      this.getTodos()
   }

   // Mengambil semua todo
   getTodos = () => {
      // jika sudah login
      if(this.props.username){

         const config = { headers: { Authorization : this.props.token } }

         axios.get(`/todo`, config)
         .then(res => this.setState({todos: res.data}))
         .catch(err => console.log({err}))
      }
   }

   addTodo = (e) => {
      e.preventDefault()

      const config = { headers: { Authorization : this.props.token } }
      const body = { description : this.description.value }

      axios.post(`/todo`, body, config)
         .then(res => this.getTodos())
         .catch(err => console.log({err}))
   }

   toggleTodo = (_id, _completed) => {
      axios.patch(`/todo/${_id}`, {completed: !_completed})
         .then(res => this.getTodos())
         .catch(err => console.log(err))
   }

   deleteTodo = (_id) => {
      axios.delete(`/todo/${_id}`)
         .then(res => this.getTodos())
         .catch(err => console.log(err))
   }

   renderList = () => {
      return this.state.todos.map(todo => {
         if(todo.completed){
            return(
               <li onDoubleClick={() => this.deleteTodo(todo._id) } className="list-group-item d-flex justify-content-between">
                  <span>
                     <del>{todo.description}</del>
                  </span>
   
                  <span>
                     <input onClick={() => { this.toggleTodo(todo._id, todo.completed) }} className="btn btn-danger" type="button" value="Cancel"/>
                  </span>
               </li>
            )
         }

         return(
            <li onDoubleClick={() => this.deleteTodo(todo._id) } className="list-group-item d-flex justify-content-between">
               <span>
                  {todo.description}
               </span>

               <span>
                  <input onClick={() => { this.toggleTodo(todo._id, todo.completed) }} className="btn btn-primary" type="button" value="Done"/>
               </span>
            </li>
         )
      })
   }

   render() { 
      if(this.props.username){
         return (
            <div className="container">
               <h1 className="display-4 text-center animated bounce delay-1s">Todo List</h1>
               <ul className="list-group list-group-flush mb-5">
                  {this.renderList()}
               </ul>
               <form onSubmit={this.addTodo} className="form-group mt-5">
                  <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.description = input}/>
                  <input className="btn btn-block btn-primary mt-3" type="submit" value="Up!"/>
               </form>
            </div>
         );
      }

      return <Redirect to='/login'/>
   }
}

let mapStateToProps = state => {
   return {
      id: state.auth.id,
      username: state.auth.username,
      token : state.auth.token
   }
}
 
export default connect(mapStateToProps)(Home);