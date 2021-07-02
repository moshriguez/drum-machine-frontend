import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./actions/user";


import './App.css';
import Login from './Auth/Login'
import Signup from "./Auth/Signup";
import { Navigation } from "./components/Navigation";

function App(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
        fetch("http://localhost:3000/api/v1/profile", {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => dispatch(setUser(data.user)))
    }
  }, [dispatch])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser(null))
  }



  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} />
      </Switch>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withRouter(App);
