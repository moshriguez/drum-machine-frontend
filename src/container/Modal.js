import React from "react";

const Modal = (props) => {

    return (
        <div className="modal-background">
            <div className="lcd-display modal-content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal