import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";

const Navigation = () => {

    return (
        <NavLink to="/login" >Login/Signup</NavLink>
    )
}