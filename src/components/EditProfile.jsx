import React, { Component } from 'react';
import axios from '../config/axios';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class EditProfile extends Component {

   state = {
      user: {},
      photo: ''
   }

   componentDidMount() {
      const config = { headers: { Authorization : this.props.token } }

      axios.get(`/user/profile`, config)
         .then(res => this.setState({user: res.data}))
         .catch(err => console.log(err))
   }


   updateData = () => {
      
      // Kirim ke API
      const config = { headers: { Authorization : this.props.token } }
      const body = {
         name : this.name.value,
         email : this.email.value,
         password : this.password.value
      }

      axios.patch(`/user/profile`, body, config)
         .then(res => alert(res.data.message))
         .catch(err => console.log(err.response.data.message))
   }

   updateAvatar = () => {
      // Membuat object formData, karena file harus dikirim dalam bentuk formData
      const body = new FormData()
      
      // Gambar yang diambil dari input file, akan ada di property 'files' , 'files' ini berbentuk array
      let image = this.image.files[0]

      // Data (name, email, password, image) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
      body.append("avatar", image)

      // Kirim ke API
      const config = { headers: { Authorization : this.props.token } }

      axios.post(`/user/avatar`, body, config)
         .then(res => alert(res.data.message))
         .catch(err => console.log(err.response.data.message))
   }

   changeImage = (e) => {
      // memungkinkan untuk melihat foto setelah kita memilih foto di folder
      // menyimpan alamatnya di state.photo
      this.setState({photo : URL.createObjectURL(e.target.files[0])})
   }

   render() { 
      if(this.props.username){
         let {name, email} = this.state.user

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
                     <label>Password</label>
                     <input className="form-control" type="password" ref={input => this.password = input}/>
                  </div>
                  <input onClick={this.updateData} className="btn btn-outline-primary"  type="button" value="Update data"/>

                  <div className="figure-img">
                     <img width="200" src={this.state.photo} />
                  </div>
                  <div className="form-group">
                     <input type="file" ref={input => this.image = input} onChange={this.changeImage}/>
                  </div>

                  <input onClick={this.updateAvatar} className="btn btn-outline-primary"  type="button" value="Update foto"/>
               </form>

            </div>
         );
      }

      return <Redirect to="/login"/>
   }
}

let mapStateToProps = state => {
   return {
      username : state.auth.username,
      token : state.auth.token
   }
}
 
export default connect(mapStateToProps)(EditProfile);