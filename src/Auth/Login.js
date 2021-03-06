import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";

const loginUrl = "http://localhost:3000/api/v1/login";

const Login = () => {
  // controlled form for user details
  const [userForm, setUserForm] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Errors if incorrect username/password
  const [error, setError] = useState(null);

  // Pass reference to useDispatch hook
  const dispatch = useDispatch()

  // Pass reference to useHistory hook
  const history = useHistory()


  // Authenticate account
  const sendAuthInfo = (body, url) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(url, config)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          dispatch(setUser(data.user));
          localStorage.setItem("jwt", data.jwt);
          history.replace('/profile')
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    sendAuthInfo(
      { ...userForm, username: userForm.username.toLowerCase() },
      loginUrl
    );
  };

  return (
    <div className="form-container">
      <div className="lcd-display user-form">
        <form onSubmit={(e) => handleLogin(e)}>
          <h1>Login</h1>
          <label>Username</label>
          <input
              onChange={(e) => handleChange(e)}
              value={userForm.username}
              name="username"
              required
            />

          <label>Password</label>
          <input
              onChange={(e) => handleChange(e)}
              value={userForm.password}
              name="password"
              type="password"
              required
            />
          <button className="btn" type="submit">Sign in</button>
        </form>
        {error ? (
          <div className="error-container">
            <h2>Error</h2>
            <ul>
              <li>{error}</li>
            </ul>
          </div>
        ) : null}

          <p>Don't have an account?</p>
          <a href="/signup" className="btn" >Sign up</a>

      </div>
    </div>
  );
};

export default Login;
