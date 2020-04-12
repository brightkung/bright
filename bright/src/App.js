import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import shoppingcart from './components/layout/ShoppingCart'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import profileBuild from './components/layout/profileBuild'
import mytable from './components/layout/mytable'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/createproject' component={CreateProject} />
          <Route path='/cart' component ={mytable} />
          <Route path='/profileBuild' component={profileBuild} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
