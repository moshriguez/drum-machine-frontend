import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditUserForm = (props) => {
    const user = useSelector(state => state.user)
    // Controlled form for edit user
    const [userBio, setUserBio] = useState("")

    const handleChangeBio = (e) => {
        setUserBio(e.target.value)
    }

    // Adds user's current info to edit form
	useEffect(() => {
		setUserBio(user.bio)
	}, [user])

    const handleSubmit = () => {
        props.editAccount(userBio)
    }

    return (
        <div>
            <label>Edit User Bio</label>
            <textarea
            placeholder="Tell us about yourself..."
            value={userBio}
            onChange={handleChangeBio}
            ></textarea>
            <button className="btn update" onClick={handleSubmit} >Update</button>
        </div>
    )
}

export default EditUserForm