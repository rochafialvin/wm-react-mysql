import React, { Component } from 'react';
import axios from '../config/axios';
import {connect} from 'react-redux'

class EditProfile extends Component {

   state = {
      user: {},
      photo : ''
   }

   componentDidMount() {
      axios.get(`/user/${this.props._id}`)
         .then(res => this.setState({user: res.data.user, photo: res.data.photo}))
         .catch(err => console.log(err))
   }


   upload = () => {
      // Membuat object formData, karena file harus dikirim dalam bentuk formData
      const data = new FormData()
      // Gambar yang diambil dari input file, akan ada di property 'files' , 'files' ini berbentuk array
      let image = this.image.files[0]

      // Gambar yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
      data.append("avatar", image)
      // Kirim ke API
      axios.post(`/users/avatar/${this.props._id}`, data)
         .then(res => console.log(res.data))
         .catch(err => console.log(err))
   }

   render() { 
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
                  <input className="form-control" type="password" ref={input => this.name = input}/>
               </div>

               <div className="form-group">
                  <input type="file" ref={input => this.image = input}/>
               </div>

               <input onClick={this.upload} className="btn btn-outline-primary"  type="button" value="Save"/>
            </form>

         </div>
      );
   }
}

let mapStateToProps = state => {
   return {
      _id : state.auth._id
   }
}
 
export default connect(mapStateToProps)(EditProfile);