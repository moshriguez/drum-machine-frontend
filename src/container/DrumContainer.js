import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { addCommentRedux, loadBeat, reset } from "../actions/drumMachine";

import Modal from './Modal'
import DrumMachine from '../components/DrumMachine';
import CommentForm from '../components/CommentForm';
import BeatSaveForm from '../components/BeatSaveForm';
import CommentsContainer from "./CommentsContainer";


const beatURL = 'http://localhost:3000/api/v1/beats/'
const commentURL = 'http://localhost:3000/api/v1/comments/'

const MyProfileContainer = () => {
    const token = localStorage.getItem("jwt")
    const { id } = useParams();
    // console.log(id)

    const dispatch = useDispatch()
    const { name, description } = useSelector(state => state.drumMachine)
    const creator = useSelector(state => state.drumMachine.user)
    const user = useSelector(state => state.user)

    //** MODAL CONTROL **
    const [showComment, setShowComment] = useState(false)
    const [showSaveBeat, setShowSaveBeat] = useState(false)
    const handleShowComment = () => setShowComment(!showComment)
    const handleShowSaveBeat = () => setShowSaveBeat(!showSaveBeat)

    useEffect(() => {
        if (id) {
            dispatch(loadBeat(id))
        } else {
            dispatch(reset())
        }
    }, [id, dispatch])

    // Add new comment
    const addComment = (comment) => {
        const bodyObj = {
            content: comment,
            user_id: user.id,
            beat_id: id
        }
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bodyObj)
        }
        fetch(commentURL, config).then(r => r.json()).then(data => {
            dispatch(addCommentRedux(data.comment))
            setShowComment(false)
        })
    };
    

    return (
        <div className="drum-container">
            <div className="beat-header">
                <header>
                    <h1>{name}</h1>
                    {id ? <p>by: {creator.username}</p> : null}
                    <button className="btn save" onClick={handleShowSaveBeat} >Save Beat</button>
                </header>
                <p>{description}</p>
            </div>
            <DrumMachine />
            {id ? <CommentsContainer handleShowComment={handleShowComment}/> : null}
            {/* Comment Form Modal */}
            {showComment ? 
            <Modal>
                <CommentForm addComment={addComment} close={handleShowComment} />
            </Modal> :
            null}
            {/* Save Beat Modal */}
            {showSaveBeat ? 
            <Modal>
                <BeatSaveForm handleShowSaveBeat={handleShowSaveBeat} />
            </Modal> :
            null}

        </div>
    )
}

export default MyProfileContainer