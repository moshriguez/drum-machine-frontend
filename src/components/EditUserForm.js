import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditUserForm = () => {
    const user = useSelector(state => state.user)
    // Controlled form for edit user
    const [userBio, setUserBio] = useState("")

    const handleChangeBio = (e) => {
        setUserBio(e.target.value)
    }
    
    // Changes edit fields when user is updated
	useEffect(() => {
		setUserBio(user.bio)
	}, [user])

    return (
        <div>
            <label>Edit User Bio</label>
            <textarea
            placeholder="Tell us about yourself..."
            value={userBio}
            onChange={handleChangeBio}
            ></textarea>
            <button className="btn update">Update</button>
        </div>
    )
}

export default EditUserForm