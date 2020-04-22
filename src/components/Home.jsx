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

   getTodos = () => {
      axios.get(`/todos/${this.props._id}`)
         .then(res => this.setState({todos: res.data}))
         .catch(err => console.log(err))
   }

   addTodo = (e) => {
      e.preventDefault()
      axios.post(`/todos/${this.props._id}`, {description: this.todo.value})
         .then(res => this.getTodos())
         .catch(err => console.log(err))
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
      if(this.props._id){
         return (
            <div className="container">
               <h1 className="display-4 text-center animated bounce delay-1s">Todo List</h1>
               <ul className="list-group list-group-flush mb-5">
                  {this.renderList()}
               </ul>
               <form onSubmit={this.addTodo} className="form-group mt-5">
                  <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.todo = input}/>
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
      _id: state.auth._id
   }
}
 
export default connect(mapStateToProps)(Home);