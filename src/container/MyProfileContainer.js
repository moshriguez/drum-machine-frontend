import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions/user";

import BeatCard from "../components/BeatCard";
import DeleteConfirm from "../components/DeleteConfirm";
import EditUserForm from "../components/EditUserForm";
import Feed from "../components/Feed";
import Modal from './Modal'

const userURL = 'http://localhost:3000/api/v1/users/'

const MyProfileContainer = () => {
    const token = localStorage.getItem("jwt")

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const handleShowEdit = () => setShowEdit(!showEdit)
    const handleShowDelete = () => setShowDelete(!showDelete)

    const renderBeats = () => {
        return user.beats.map(beat => {
            return <BeatCard key={beat.id} beat={beat}/>
        })
    }

    const editAccount = (userBio) => {
		const config = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({bio: userBio})
		}

		fetch(userURL + user.id, config).then(r => r.json()).then(data => {
			const user = data.user
			dispatch(setUser(user))
			setShowEdit(false)
		})
	};

    return (
        <div className="my-profile-container">
            <div className="profile-section">
                <h2>User: {user.username}</h2>
                <h3>Bio:</h3>
                <p>{user.bio}</p>
                <button 
                className="btn edit"
                onClick={handleShowEdit}
                >Edit Account</button>
                <button 
                className="btn delete"
                onClick={handleShowDelete}                
                >Delete Account</button>
            </div>
            <div className="feed-section">
                <h2>Feed:</h2>
                <Feed />
            </div>
            <div className="beats-section">
                <h2>Beats:</h2>
                <ul>{renderBeats()}</ul>
            </div>
            {showEdit ? 
            <Modal>
                <EditUserForm editAccount={editAccount}/>
            </Modal> :
            null}
            {showDelete ? 
            <Modal>
                <DeleteConfirm close={handleShowDelete} />
            </Modal> :
            null}

        </div>
    )
}

export default MyProfileContainer