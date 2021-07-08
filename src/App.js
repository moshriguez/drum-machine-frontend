import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom'

import { useDispatch } from "react-redux";
import { setUser } from "./actions/user";

// LOCAL IMPORTS
import './App.css';
import Login from './Auth/Login'
import Signup from "./Auth/Signup";
import Navigation from "./components/Navigation";
import DrumMachine from './components/DrumMachine';
import MyProfileContainer from './container/MyProfileContainer';
import YourProfileContainer from './container/YourProfileContainer';
import DrumContainer from './container/DrumContainer';

function App(props) {
  const dispatch = useDispatch()
  const token = localStorage.getItem("jwt")

  // Pass reference to useHistory hook
  const history = useHistory()

  // TODO -  need to add error handling for when the token expires
  //? maybe fixed??? --- we'll have to wait to see
  useEffect(() => {
    if (token) {
        fetch("http://localhost:3000/api/v1/profile", {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          if (data.message === 'Please log in') {
            history.replace('/login')
          } else {
            dispatch(setUser(data.user))
          }
        })
    }
  }, [dispatch, history, token])

  return (
    <div>
      <Navigation />
      <Switch>
        
        <Route exact path='/drum_machine/:id' render={() => <DrumContainer />} />
        <Route exact path='/drum_machine' render={() => <DrumContainer />} />
        <Route exact path='/' render={() => <DrumMachine />} />
        {token ? null : <Redirect exact from="/profile" to="/login" />}
        <Route exact path='/profile/:id' render={() => <YourProfileContainer />} />
        <Route exact path='/profile' render={() => <MyProfileContainer />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} />
        <Redirect from="/logout" to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
