import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
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
          // console.log(data)
          if (data.message === 'Please log in') {
            history.replace('/login')
          } else {
            dispatch(setUser(data.user))
          }
        })
    }
  }, [dispatch, history])

  return (
    <div>
      <Navigation />
      <Switch>
        {/* 
        keep DrumMachine as home page;
        create new DrumContainer for when viewing user created beats
        DrumContainer will have beat name, desc, and comments and ability to leave a comment
        path should be have /:id to load user created beats and allow for direct access
        */}
        <Route exact path='/drum_machine/:id' render={() => <DrumContainer />} />
        <Route exact path='/drum_machine' render={() => <DrumContainer />} />
        <Route exact path='/' render={() => <DrumMachine />} />
        {user.username === 'defaultUser' ? <Redirect exact from="/profile" to="/login" /> : null}
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
