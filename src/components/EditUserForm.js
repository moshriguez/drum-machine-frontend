import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditUserForm = (props) => {
    const user = useSelector(state => state.user)
    // Controlled form for edit user
    const [userForm, setUserForm] = useState({ bio: "", musical_influences: "" });
    const handleChange = (e) => {
      setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };
  

    // const handleChangeBio = (e) => {
    //     setUserBio(e.target.value)
    // }

    // Adds user's current info to edit form
	useEffect(() => {
        setUserForm({bio: user.bio, musical_influences: user.musical_influences})
	}, [user])

    const handleSubmit = () => {
        props.editAccount(userForm)
    }

    return (
        <>
            <label>Edit User Bio</label>
            <textarea
            name="bio"
            value={userForm.bio}
            onChange={handleChange}
            ></textarea>
            <textarea
            name="musical_influences"
            value={userForm.musical_influences}
            onChange={handleChange}
            ></textarea>
            <div className="btn-group">
                <button className="btn update" onClick={handleSubmit} >Update</button>
                <button className="btn update" onClick={props.close} >Cancel</button>
            </div>
        </>
    )
}

export default EditUserForm