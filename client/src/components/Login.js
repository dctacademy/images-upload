import React from 'react'
// import { Link,Redirect } from 'react-router-dom'
import axios from './config/axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'


import { saveUser } from '../actions/User'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({[e.target.name] : value})
    }
    handleSubmit= (e) =>{
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
        .then((response) =>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    type: 'info',
                    text: "Check the fileds"
                })
            }else{
                const token = response.data.token
                const user = {
                    username: response.data.fullName,
                    role: response.data.role
                }
                localStorage.setItem('authToken', token)
                this.props.dispatch(saveUser(user))
                this.props.history.push('/')
                
            }

        }).catch(err => {
            console.log(err)
        })

    }

    render(){
        const {email, password} = this.state
        return (
            <div>
                <h2>Login</h2>
                <form >
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={this.handleChange}/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={this.handleChange}/>
                <br />
                <button onClick={this.handleSubmit}>Login</button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}   

export default connect(mapStateToProps)(Login)