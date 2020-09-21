import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {updateUserInfo} from '../actions/User'
// import { Link } from 'react-router-dom'
import axios from './config/axios'
const EditUser = (props) => {
    const [formData, setFormData] = useState({email: "",fullName: ""})
    useEffect(() => {
        axios.get('/users/account',{
            headers: {
                'x-auth': localStorage.getItem("authToken")
            }
        }).then((response)=>{
            setFormData({email: response.data.email, fullName: response.data.fullName})
        })
      },[]);
    const handleSubmit = e =>{
        e.preventDefault();
        const id = props.match.params.id
        const data = new FormData()
        data.append('email', formData.email)
        data.append('fullName', formData.fullName)
        data.append('image', formData.image)
        props.dispatch(updateUserInfo(id,data,props.history))
        // console.log(formData)
    }
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const fileHandle = (e) =>{
        // console.log(e.target.files)
        setFormData({...formData,image: e.target.files[0]})
    }
    return (
        <React.Fragment>
            <h2>Edit Account</h2>
            {Object.keys(props.user).length > 0 && 
            <>
             <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}/>
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                <br />
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image"  onChange={fileHandle}/>
                <br />
                <button >Update</button>
                </form>
             </>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditUser)