import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {

    document.title = 'DCT Academy'    
    return (
        <React.Fragment>
            <h2>Welocme to DCT</h2>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)