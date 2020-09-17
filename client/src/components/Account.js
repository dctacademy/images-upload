import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Account = (props) => {
    const {user} = props

    return (
        <React.Fragment>
            <h2>Account</h2>
            {user.image && 
            <>
             <p>Full Name: {user.fullName}</p>
             <p>Email: {user.email}</p>
             <p>Role: {user.role}</p>
             <img alt="profile" src={`http://localhost:3005/${user.image.path}`} style={{height: 100,width: 100}} />
             <Link to={`/edit/${user.id}`}>Edit</Link>
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

export default connect(mapStateToProps)(Account)