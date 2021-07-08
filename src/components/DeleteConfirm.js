import React from "react";

const DeleteConfirm = (props) => {

    return (
        <>
            <p>Are you sure you want to delete your account?</p>
            <div className="btn-group">
                <button className="btn yes" onClick={props.deleteAccount}>Yes</button>
                <button className="btn no" onClick={props.close}>No</button>
            </div>
            
        </>
    )
}

export default DeleteConfirm