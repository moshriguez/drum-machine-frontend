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
        <>
            <label>Enter New Comment</label>
            <textarea
            value={newComment}
            onChange={handleChange}
            ></textarea>
            <div className="btn-group">
                <button className="btn submit" onClick={handleSubmit} >Submit</button>
                
                <button className="btn update" onClick={props.close} >Cancel</button>
            </div>
        </>
    )
}

export default CommentForm