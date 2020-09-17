import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
function App() {
  return (
    <BrowserRouter>      
      <Switch>

          <Route path="/" component={Home} exact={true} />
          <Route path="/logout" component={Logout} exact={true} />

          <Route path="/login" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} />
      </Switch>
    </BrowserRouter>
          
  );
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(App)
