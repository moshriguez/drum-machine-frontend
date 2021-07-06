import React, { useState } from "react";

const CommentForm = (props) => {
    // Controlled form
    const [newComment, setNewComment] = useState("")

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = () => {
        props.addComment(newComment)
    }

    return (
        <div>
            <label>Enter New Comment</label>
            <textarea
            placeholder="What do you think about this beat..."
            value={newComment}
            onChange={handleChange}
            ></textarea>
            <button className="btn submit" onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default CommentForm