import React from 'react'
import axios from './config/axios'
import { connect } from 'react-redux'

import { removeUser } from '../actions/User'

class Logout extends React.Component {

    componentDidMount() {
        const { user, dispatch, history } = this.props
        history.push("/")
        if (user) {
            axios.delete("/users/logout", {
                headers: { 'x-auth': user.token }
            })
                .then(res => {
                    if (res.data.success) {
                        dispatch(removeUser())
                        localStorage.removeItem("authToken")
                        history.push('/login')
                    }
                })
        }
    }

    render() {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Logout)