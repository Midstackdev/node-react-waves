import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Layout from './hoc/Layout'
import RegisterLogin from './components/auth/index'
import Register from './components/auth/Register'

const Routes = () =>  {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" exact component={RegisterLogin} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )

}

export default Routes;
