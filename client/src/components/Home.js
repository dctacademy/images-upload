import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = (props) => {

    document.title = 'DCT Academy'
    const { user } = props
    
    return (
        <React.Fragment>
            <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <Link className="navbar-brand" to="/">DCT Academy </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                            
                                { user.role ? 
                                    <React.Fragment>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle highlight" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            More Options
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                            {user.role === 'admin' && 
                                                <Link className="nav-link highlight" to={`/users`}>Users</Link>}
                                            </div>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle highlight" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Account
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {/* <a className="dropdown-item" href="/#home">Home</a> */}
                                            
                                            <Link className="nav-link highlight mb-1" to={`/users/${user.id}`}>My Account</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="nav-link highlight mb-1 logout" to={`/logout`}>Logout</Link>
                                            </div>
                                        </li>
                                    </React.Fragment> : 
                                    <li className="nav-item">
                                        <Link className="nav-link highlight" to="/login">Login</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)