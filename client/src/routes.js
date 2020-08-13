import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Layout from './hoc/Layout'
import Auth from './hoc/Auth'
import RegisterLogin from './components/auth/index'
import Register from './components/auth/Register'
import UserDashboard from './components/user'

const Routes = () =>  {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />

        <Route path="/auth" exact component={Auth(RegisterLogin, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )

}

export default Routes;
