import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { addCommentRedux, loadBeat } from "../actions/drumMachine";

import Modal from './Modal'
import DrumMachine from '../components/DrumMachine';
import CommentForm from '../components/CommentForm';
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
            const token = localStorage.getItem("jwt")
            fetch(beatURL + id, {
                method: "GET",
                headers: {
                    "Content-Type": "appliction/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(r => r.json())
            .then(data => dispatch(loadBeat(data.beat)))
        } else {
            dispatch({type: 'RESET'})
        }
    }, [id])

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
            <h2>{name}</h2>
            {id ? <p>by: {creator.username}</p> : null}
            <p>{description}</p>
            <button className="btn save">Save Beat</button>
            <DrumMachine />
            {id ? <CommentsContainer handleShowComment={handleShowComment}/> : null}
            {/* Comment Form Modal */}
            {showComment ? 
            <Modal>
                <CommentForm addComment={addComment}/>
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