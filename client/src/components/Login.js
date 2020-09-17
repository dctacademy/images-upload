import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import axios from './config/axios'
import { connect } from 'react-redux'

import { saveUser } from '../actions/User'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email_mobile: "",
            password: "",
            error: '',
            isSubmitting: false,
            isLoggedIn: false
        }
    }

    componentDidMount(){
        document.title = "Login"
    }

    derivedStateFromProps(){
        const { user, history } = this.props
        if(user.status === "true"){
            history.push(`/${user.role}`)
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email_mobile, password } = this.state
        if(email_mobile === "" || password === ""){
            this.setState(() => ({
                error: "invalid credentials"
            }))
        }else{ 
            this.setState(() => ({ isSubmitting: true }))
            axios.post("/api/users/login", { email_mobile, password })
                .then(res => {
                    if(res.data.error){
                        this.setState(() => ({
                            error: res.data.error,
                            isSubmitting: false,
                            password: ""
                        }))
                    }else{
                        this.setState(() => ({
                            isSubmitting: false,
                            email_mobile: "",
                            password: "",
                            error: ""
                        }))
                        const token = res.data.token
                        this.props.dispatch(saveUser(res.data))
                        localStorage.setItem('token',JSON.stringify(token))
                        if(res.data.role === 'admin'){
                            this.props.history.push(`/users`)
                        }else{
                            // this.props.history.push(`/departments`)
                            window.location.replace(window.location.origin+'/departments');
                            // this.setState({isLoggedIn: true})
                        }
                    }
                })
        }
    }

    render(){
        return (
            <div className="wrapper">
                {this.state.isLoggedIn ? <Redirect to="/departments" />: 
                <div className="loginPage">
                    <div className="loginBox">
                        <div className="logo">
                            <Link to="/"><i className="fas fa-angle-left"></i></Link>
                        </div>
                        <div className="text half">

                        </div>
                        <div className="action half">
                            <div>
                                <div>
                                    <h1>Sign in to EXPO LOG TECHNOLOGIES</h1>
                                    <form onSubmit={this.handleSubmit}>
                                        <input className="field" 
                                               type="text" 
                                               placeholder="Email/Mobile"
                                               onChange={this.handleChange}
                                               value={this.state.email_mobile}
                                               name="email_mobile"
                                            />
                                        <input className="field" 
                                               type="password" 
                                               placeholder="Password" 
                                               onChange={this.handleChange}
                                               value={this.state.password}
                                               name="password"
                                            />
                                        <div className="link">
                                            <button disabled={this.state.isSubmitting}>
                                                { this.state.isSubmitting ? <i className="fas fa-spin fa-circle-notch"></i> : 'Login' }
                                            </button>
                                            <Link to="/forgot-password">Forgot Password</Link>
                                        </div>
                                    </form>
                                    { this.state.error && <p className="error mb-0 mt-3">{this.state.error}</p> }
                                    <div className="extraLink">
                                        Don't have an account ? <Link to="/register">Create new</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
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