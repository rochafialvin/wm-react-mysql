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
         // menggunakan access token untuk request ke API
         const config = { headers: { Authorization : this.props.token } }
         // melakukan proses request
         axios.get(`/todo`, config)
         // jika berhasil, data akan disimpan di state
         .then(res => this.setState({todos: res.data}))
         // jika gagal akan menampilkan pesan error di console
         .catch(err => console.log({err}))
      }
   }

   // menambahkan todo baru
   addTodo = (e) => {
      // agar halaman tidak refresh saat di submit
      e.preventDefault()

      // mempersiapkan access token dan body
      const config = { headers: { Authorization : this.props.token } }
      const body = { description : this.description.value }

      // melakukan proses request untuk menambah data baru
      axios.post(`/todo`, body, config)
         // kalau berhasil, kemudian akan request data ulang
         .then(res => this.getTodos())
         // kalau gagal, akan munculkan di console
         .catch(err => console.log({err}))
   }

   // jika menekan tombone 'Done', mengubah status completed
   toggleTodo = (id, completed) => {

      // mempersiapkan access token dan body
      const config = { headers: { Authorization : this.props.token } }
      const body = {completed: !completed}

      // melakukan proses request untuk mengubah status completed
      axios.patch(`/todo/${id}`, body, config )
         // kalau berhasil, kemudian akan request data ulang
         .then(res => this.getTodos())
         // kalau gagal, akan munculkan di console
         .catch(err => console.log({err}))
   }

   deleteTodo = (id) => {
      // mempersiapkan access token dan body
      const config = { headers: { Authorization : this.props.token } }

      axios.delete(`/todo/${id}`, config)
         .then(res => this.getTodos())
         .catch(err => console.log(err))
   }

   renderList = () => {
      return this.state.todos.map(todo => {
         if(todo.completed){
            return(
               <li key={todo.id} onDoubleClick={() => this.deleteTodo(todo.id) } className="list-group-item d-flex justify-content-between">
                  <span>
                     <del>{todo.description}</del>
                  </span>
   
                  <span>
                     <input onClick={() => { this.toggleTodo(todo.id, todo.completed) }} className="btn btn-danger" type="button" value="Cancel"/>
                  </span>
               </li>
            )
         }

         return(
            <li key={todo.id} onDoubleClick={() => this.deleteTodo(todo.id) } className="list-group-item d-flex justify-content-between">
               <span>
                  {todo.description}
               </span>

               <span>
                  <input onClick={() => { this.toggleTodo(todo.id, todo.completed) }} className="btn btn-primary" type="button" value="Done"/>
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