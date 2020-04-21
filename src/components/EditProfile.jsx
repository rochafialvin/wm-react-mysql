import React, { Component } from 'react';
import axios from '../config/axios';
import {connect} from 'react-redux'

class EditProfile extends Component {


   upload = () => {
      // Membuat object formData, karena file harus dikirim dalam bentuk formData
      const data = new FormData()
      // Gambar yang diambil dari input file, akan ada di property 'files' , 'files' ini berbentuk array
      let image = this.image.files[0]
      // Gambar yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
      data.append("avatar", image)
      // Kirim ke API
      axios.post(`/users/avatar/${this.props._id}`, data)
         .then(res => alert(res.data))
         .catch(err => console.log(err))
   }

   render() { 
      return (
         <div className="container"> 
            <h1>Edit Profile</h1>
            <form >
               <input className="custom-file" type="file" ref={input => this.image = input}/>
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