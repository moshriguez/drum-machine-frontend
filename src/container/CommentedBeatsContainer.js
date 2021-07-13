import React from "react";

import { useSelector } from "react-redux";

import CommentCard from "../components/CommentCard";
import BeatCard from "../components/BeatCard";

const CommentedBeatsContainer = (props) => {

    const { comments, commented_beats, username } = useSelector(state => state.otherUser)

    const renderCommentedBeats = () => {
        let uniqueCommentedBeats = [];
        commented_beats.forEach((beat) => {
            if (!uniqueCommentedBeats.find(b => beat.id === b.id)) {
                uniqueCommentedBeats.push(beat);
            }
        });

        return uniqueCommentedBeats.map(beat => {
            return (
                <div>
                    <BeatCard key={beat.id} beat={beat} showUsername={true} />  
                    {comments.filter(comment => comment.beat_id === beat.id).map(comment => {
                        return <CommentCard key={comment.id} comment={comment} showUsername={false} />
                    })}
                </div>
            )
            
        })
    }

    return (
        <div className="comments-container" >
            <h2>{username}'s Comments:</h2>
            {renderCommentedBeats()}
        </div>
    )
}

export default CommentedBeatsContainer