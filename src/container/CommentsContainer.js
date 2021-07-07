import React from "react";

import { useDispatch, useSelector } from "react-redux";

import CommentCard from "../components/CommentCard";

const CommentsContainer = (props) => {

    const { comments } = useSelector(state => state.drumMachine)

    const renderComments = () => {
        return comments.map(comment => {
            return <CommentCard key={comment.id} comment={comment} showUsername={true}/>
        })
    }

    return (
        <div className="comments-container" >
            <h3>Comments:</h3>
            <button onClick={props.handleShowComment}>Add Comment</button>
            {renderComments()}
        </div>
    )
}

export default CommentsContainer