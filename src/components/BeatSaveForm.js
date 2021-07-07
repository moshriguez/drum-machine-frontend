import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const BeatSaveForm = (props) => {
    const { name, description, tempo, pad1, pad2, pad3, pad4 } = useSelector(state => state.drumMachine)

    // Controlled form
    const [beatForm, setBeatForm] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
    setBeatForm({ ...beatForm, [e.target.name]: e.target.value });
    };

    // Adds user's current info to edit form
	useEffect(() => {
		setBeatForm({
            name: name,
            description: description
        })
	}, [])

    const handleSubmit = () => {
        
    }

    return (
        <div>
            <h4>Enter Beat Info</h4>
            <label>Title</label>
            <input
            name="name"
            placeholder="Title"
            value={beatForm.name}
            onChange={handleChange}
            ></input>
            <label>Description</label>
            <input
            name="description"
            placeholder="Description"
            value={beatForm.description}
            onChange={handleChange}
            ></input>
            <button className="btn cancel" onClick={props.handleShowSaveBeat} >Cancel</button>
            <button className="btn submit" onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default BeatSaveForm