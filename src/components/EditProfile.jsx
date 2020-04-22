import React, { Component } from 'react';
import axios from '../config/axios';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class EditProfile extends Component {

   state = {
      user: {},
      photo : null
   }

   componentDidMount() {
      axios.get(`/user/${this.props._id}`)
         .then(res => this.setState({user: res.data.user}))
         .catch(err => console.log(err))
   }


   update = () => {
      // Membuat object formData, karena file harus dikirim dalam bentuk formData
      const data = new FormData()

      
      // Gambar yang diambil dari input file, akan ada di property 'files' , 'files' ini berbentuk array
      let name = this.name.value
      let email = this.email.value
      let age = this.age.value
      let password = this.password.value
      let image = this.image.files[0]

      // Data (name, email, password, image) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
      data.append("name", name)
      data.append("email", email)
      data.append("age", age)
      data.append("password", password)
      data.append("avatar", image)

      // Kirim ke API
      axios.patch(`/user/${this.props._id}`, data)
         .then(res => console.log(res.data))
         .catch(err => console.log(err))
   }

   changeImage = (e) => {
      this.setState({photo : URL.createObjectURL(e.target.files[0])})
   }

   render() { 
      if(this.props._id){
         let {name, email, age} = this.state.user

         return (
            <div className="container"> 
               <h1>Edit Profile</h1>
               <form >
                  <div className="form-group">
                     <label>Name</label>
                     <input className="form-control" type="text" ref={input => this.name = input} defaultValue={name}/>
                  </div>

                  <div className="form-group">
                     <label>Email</label>
                     <input className="form-control" type="email" ref={input => this.email = input} defaultValue={email}/>
                  </div>

                  <div className="form-group">
                     <label>Age</label>
                     <input className="form-control" type="number" ref={input => this.age = input} defaultValue={age}/>
                  </div>

                  <div className="form-group">
                     <label>Password</label>
                     <input className="form-control" type="password" ref={input => this.password = input}/>
                  </div>

                  <div className="figure-img">
                     <img width="200" src={this.state.photo} />
                  </div>
                  <div className="form-group">
                     <input type="file" ref={input => this.image = input} onChange={this.changeImage}/>
                  </div>

                  <input onClick={this.update} className="btn btn-outline-primary"  type="button" value="Update!"/>
               </form>

            </div>
         );
      }

      return <Redirect to="/login"/>
   }
}

let mapStateToProps = state => {
   return {
      _id : state.auth._id
   }
}
 
export default connect(mapStateToProps)(EditProfile);