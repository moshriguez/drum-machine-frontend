import React, { useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./actions/user";

// LOCAL IMPORTS
import './App.css';
import Login from './Auth/Login'
import Signup from "./Auth/Signup";
import Navigation from "./components/Navigation";
import DrumContainer from './container/DrumContainer';
import MyProfileContainer from './container/MyProfileContainer';

function App(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Pass reference to useHistory hook
  const history = useHistory()

  // TODO -  need to add error handling for when the token expires
  //? maybe fixed??? --- we'll have to wait to see
  useEffect(() => {
    const token = localStorage.getItem("jwt")
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
          if (data.error) {
            console.log(data.user)
            history.replace('/login')
          } else {
            dispatch(setUser(data.user))
          }
        })
    }
  }, [dispatch])

  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/drum_machine' render={() => <DrumContainer />} />
        <Route exact path='/profile' render={() => <MyProfileContainer />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} />
        <Redirect from="/logout" to="/drum_machine" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
