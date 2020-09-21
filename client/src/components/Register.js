import React from 'react'
import axios from './config/axios'
import Swal from 'sweetalert2'

class Register extends React.Component{
    constructor(){
        super();
        this.state= {
            fullName:"",
            email: "",
            password: "",
            image: {}
        }
    }
    fileHandle = (e) =>{
        console.log(e.target.files)
        this.setState({image: e.target.files[0]})
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName',this.state.fullName)
        formData.append('email',this.state.email)
        formData.append('password',this.state.password)
        formData.append('image',this.state.image)
        axios.post('/users/register', formData)
        .then((response) =>{
            // console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    type: 'info',
                    text: "Check the fileds"
                })
            }else{
                console.log(response.data)
                this.props.history.push('/login')
                
            }

        }).catch(err => {
            console.log(err)
        })
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({[e.target.name] : value})
    }
    render(){
        const {email, password, fullName} = this.state
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" value={fullName} onChange={this.handleChange}/>
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={this.handleChange}/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={this.handleChange}/>
                <br />
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image"  onChange={this.fileHandle}/>
                <br />
                <button >Register</button>
                </form>
            </div>
        )
    }
}

export default Register