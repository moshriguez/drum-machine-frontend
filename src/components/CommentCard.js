import React from "react";
import { Link } from 'react-router-dom'

const CommentCard = ({ comment, showUsername }) => {

    return (
        <div className="comment-card">
            <p>{comment.content}</p>
            {showUsername ? <Link to={'/profile/' + comment.user_id}>{comment.username}</Link> : null}
        </div>
    )
}

export default CommentCard