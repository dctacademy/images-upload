import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import Account from "./components/Account"
import EditUser from './components/EditUser';
import Gallery from './components/Gallery/Galleries';
function App(props) {
  // console.log(props.user)
  return (
    <React.Fragment>
    <CssBaseline />
      <Container maxWidth="lg">
      <BrowserRouter>   
      <Link to="/"> DCT Academy</Link> 
      {Object.keys(props.user).length > 0 ? 
       <><Link to="/account"> Account</Link><Link to="/logout"> Logout</Link>
       <Link to="/galleries"> Gallery</Link>
       </>
        :
        <><Link to="/login"> Login</Link>
        <Link to="/register"> Register</Link></>
        
      } 
        <br />
        <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/logout" component={Logout} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/account" component={Account} exact={true} />
            <Route path="/edit/:id" component={EditUser} exact={true} />
            <Route path="/galleries" component={Gallery} exact={true} />
        </Switch>
        
      </BrowserRouter>
    </Container>
    </React.Fragment>

          
  );
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(App)
