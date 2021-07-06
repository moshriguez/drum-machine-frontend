import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { loadBeat } from "../actions/drumMachine";

import Modal from './Modal'
import DrumMachine from '../components/DrumMachine';
import CommentsContainer from "./CommentsContainer";


const beatURL = 'http://localhost:3000/api/v1/beats/'

const MyProfileContainer = () => {
    const token = localStorage.getItem("jwt")
    // Pass reference to useHistory hook
    // const history = useHistory()
    const { id } = useParams();
    // console.log(id)

    const dispatch = useDispatch()
    const { name, description } = useSelector(state => state.drumMachine)
    const creator = useSelector(state => state.drumMachine.user)

    //** MODAL CONTROL **
    const [showComment, setShowComment] = useState(false)
    const [showSaveBeat, setShowSaveBeat] = useState(false)
    const handleShowComment = () => setShowComment(!showComment)
    const handleShowSaveBeat = () => setShowSaveBeat(!showSaveBeat)

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        fetch(beatURL + id, {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(r => r.json())
        .then(data => dispatch(loadBeat(data.beat)))
    }, [id])


    return (
        <div className="drum-container">
            <h2>{name}</h2>
            <p>by: {creator.username}</p>
            <p>{description}</p>
            <DrumMachine />
            <CommentsContainer />
            {/* Comment Form Modal */}
            {showComment ? 
            <Modal>
            </Modal> :
            null}
            {/* Save Beat Modal */}
            {showSaveBeat ? 
            <Modal>
            </Modal> :
            null}

        </div>
    )
}

export default MyProfileContainer