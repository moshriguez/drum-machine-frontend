import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions/user";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
  };

  return (
      <ul className="menu">
          <li><NavLink to="/drum_machine">Make a Beat</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li>{user.username !== 'defaultUser' ? <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink> : <NavLink to="/login">Login/Signup</NavLink> }</li>
      </ul>
    
    )
};

export default Navigation;
