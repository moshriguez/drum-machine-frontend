import React, {useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import { setUser } from "./actions/user";


import './App.css';
import Login from './Auth/Login'
import Signup from "./Auth/Signup";

function App(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const [user, setUser] = useState(null)

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
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser(null))
  }



  return (
    <div>

      <Login />
      <Signup />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

export default App;
