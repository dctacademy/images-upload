import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {updateUserInfo} from '../actions/User'
const EditUser = (props) => {
    const {user} = props
    const [formData, setFormData] = useState({email: user.email || "", fullName: user.fullName || ""})
    useEffect(() => {
        setFormData({email: user.email, fullName:  user.fullName})       
    },[user])
    const handleSubmit = e =>{
        e.preventDefault();
        const id = props.match.params.id
        const data = new FormData()
        data.append('email', formData.email)
        data.append('fullName', formData.fullName)
        data.append('image', formData.image)
        props.dispatch(updateUserInfo(id,data,props.history))
    }
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const fileHandle = (e) =>{
        setFormData({...formData,image: e.target.files[0]})
    }
    return (
        <React.Fragment>
            <h2>Edit Account</h2>
            <>
             <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}/>
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                <br />
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image" onChange={fileHandle}/>
                <br />
                <button >Update</button>
                </form>
             </>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(EditUser)