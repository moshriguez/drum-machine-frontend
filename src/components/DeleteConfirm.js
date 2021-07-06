import React from "react";

const DeleteConfirm = (props) => {

    return (
        <div>
            <p>Are you sure you want to delete your account?</p>
            <button className="btn no" onClick={props.close}>No</button>
            <button className="btn yes" onClick={props.deleteAccount}>Yes</button>
        </div>
    )
}

export default DeleteConfirm