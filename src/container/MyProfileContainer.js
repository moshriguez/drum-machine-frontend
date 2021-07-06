import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import BeatCard from "../components/BeatCard";
import DeleteConfirm from "../components/DeleteConfirm";
import EditUserForm from "../components/EditUserForm";
import Feed from "../components/Feed";
import Modal from './Modal'


const MyProfileContainer = () => {
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
                <EditUserForm />
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