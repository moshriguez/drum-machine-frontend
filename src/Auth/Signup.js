import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";

const userUrl = "http://localhost:3000/api/v1/users";

const Signup = () => {
  // controlled form for user details
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Errors if user doesn't pass validations
  const [errors, setErrors] = useState([]);

  // Pass reference to useDispatch hook
  const dispatch = useDispatch()

  // Pass reference to useHistory hook
  const history = useHistory()

  // sends user signup info to back end and handles validation errors
  const sendAuthInfo = () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: userForm.username,
        password: userForm.password,
        bio: 'Tell us about yourself...'
      }),
    };
    fetch(userUrl, config)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
            const newErrors = [];
            data.error.forEach(error => newErrors.push(error))
            setErrors(newErrors)
        } else {
            dispatch(setUser(data.user));
            localStorage.setItem("jwt", data.jwt);
            history.replace('/profile')
        }
      });
  };

  // checks for errors on the front end
  const frontendErrorCheck = () => {
    const newErrors = [];
    if (userForm.password !== userForm.confirm) {
        newErrors.push('The password you have entered does not match the password confirmation')
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/
    if (!passwordRegex.test(userForm.password)) {
        newErrors.push('Passwords must include a capital letter, a lowercase letter and a number.')
    }
    setErrors(newErrors)
    //returns true for 0 errors
    return !newErrors.length
  }

  // checks for errors on frontend, then sends info to back end
  const handleSignup = (e) => {
    e.preventDefault();
    frontendErrorCheck() ? sendAuthInfo() : console.log();
  };

  return (
    <div className="form-container">
      <div className="lcd-display user-form">
        <form onSubmit={(e) => handleSignup(e)}>
          <h1>Sign Up</h1>
          <label>Create a username</label>
          <input
              onChange={(e) => handleChange(e)}
              value={userForm.username}
              name="username"
              required
            />
          <label>Create a password</label>
          <input
              onChange={(e) => handleChange(e)}
              value={userForm.password}
              name="password"
              type="password"
              required
            />
          <label>Confirm your password</label>
            <input
              onChange={(e) => handleChange(e)}
              value={userForm.confirm}
              name="confirm"
              type="password"
              required
            />
          <button className="btn" type="submit">Create account</button>
        </form>
        {errors.length ? (
          <div className="error-container">
            <h2>Errors</h2>
            <ul>
              {errors.map((error, idx) => {
                  return <li key={idx}>{error}</li>
              }
              )}
            </ul>
          </div>
        ) : null}
          <p>Already have an account?</p>
          <a href="/login" className="btn" >Login</a>

      </div>
    </div>
  );
};

export default Signup;
