import React, { useState } from "react";
// import { useHistory } from 'react-router-dom'
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const userUrl = "http://localhost:3000/api/v1/users";

const Signup = ({ setUser }) => {
  // controlled form for user details
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Errors if doesn't pass validations
  const [errors, setErrors] = useState([]);

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
            newErrors.push(data.error)
            setErrors(newErrors)
        } else {
            setUser(data.user);
            localStorage.setItem("jwt", data.jwt);
        }
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = [];
    userForm.password !== userForm.confirm
    ? newErrors.push("The password you have entered does not match the password confirmation")
    : console.log();
    setErrors(newErrors)

    !newErrors.length ? sendAuthInfo() : console.log();
  };

  return (
    <div className="form-container">
      <div className="user-form">
        <form onSubmit={(e) => handleSignup(e)}>
          <h1>Sign Up</h1>
          <label>Create a username</label>
          <div className="info-container">
            <AiOutlineUser size={23} />
            <input
              onChange={(e) => handleChange(e)}
              value={userForm.username}
              name="username"
              placeholder="Enter your username..."
              required
            />
          </div>
          <label>Create a password</label>
          <div className="info-container">
            <AiOutlineLock size={23} />
            <input
              onChange={(e) => handleChange(e)}
              value={userForm.password}
              name="password"
              placeholder="Enter your password..."
              type="password"
              required
            />
          </div>
          <label>Confirm your password</label>
          <div className="info-container">
            <AiOutlineLock size={23} />
            <input
              onChange={(e) => handleChange(e)}
              value={userForm.confirm}
              name="confirm"
              placeholder="Enter your password..."
              type="password"
              required
            />
          </div>
          <button type="submit">Create account</button>
        </form>
        {errors.length ? (
          <div className="error-container">
            <h2>Errors</h2>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="signup-container">
          <p>Already have an account?</p>
          <a href="#">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
