import React from "react";

const CommentCard = ({ comment }) => {

    return (
        <div className="comment-card">
            <p>{comment.content}</p>
        </div>
    )
}

export default CommentCard