import React, {useEffect, useState} from "react"

import './App.css';
import Login from './Auth/Login'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
        fetch("http://localhost:3000/api/v1/profile", {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setUser(data.user))
    }
  }, [])



  return (
    <Login setUser={setUser}/>
  );
}

export default App;
