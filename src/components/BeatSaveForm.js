import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { saveBeat, updateBeat } from "../actions/user";

const BeatSaveForm = (props) => {
    const dispatch = useDispatch();
    const { name, description, tempo, pad1, pad2, pad3, pad4 } = useSelector(state => state.drumMachine)
    const otherUser = useSelector(state => state.drumMachine.user)
    const user = useSelector(state => state.user)

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

    // Errors if user doesn't pass validations
    const [errors, setErrors] = useState([]);
    // Catches success message from backend and renders on page before model unmounts
    const [message, setMessages] = useState('');


    const { id } = useParams();
    const handleSubmit = () => {
        const token = localStorage.getItem("jwt")
        let method, beatURL
        if (id && user.id === otherUser.id) {
            method = 'PATCH'
            beatURL = 'http://localhost:3000/api/v1/beats/' + id 
        } else {
            method = 'POST'
            beatURL = 'http://localhost:3000/api/v1/beats/'
        }
        const bodyObj = {
            ...beatForm,
            tempo: tempo,
            user_id: user.id,
            pad1: pad1,
            pad2: pad2,
            pad3: pad3,
            pad4: pad4,
        }
        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyObj)
        }
        fetch(beatURL, config)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
              const newErrors = [];
              data.error.forEach(error => newErrors.push(error))
              setErrors(newErrors)
          } else if (data.message) {
              console.log(data)
              setMessages(data.message)
              {id ? dispatch(updateBeat(data.beat)) : dispatch(saveBeat(data.beat))}
              setTimeout(() => props.handleShowSaveBeat(), 1000)
          }
        });
    }

    return (
        <>
            {message.length ? (
                <div>
                    <p>{message}</p>
                </div>
            ) :
            (
                <>
                    <h4>Enter Beat Info</h4>
                    <label>Title</label>
                    <input
                        name="name"
                        placeholder="Title"
                        value={beatForm.name}
                        onChange={handleChange}
                    ></input>
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={beatForm.description}
                        onChange={handleChange}
                    ></textarea>
                    <div className="btn-group" >
                        <button className="btn submit" onClick={handleSubmit} >Submit</button>
                        <button className="btn cancel" onClick={props.handleShowSaveBeat} >Cancel</button>
                    </div>
                    {errors.length ? (
                    <div className="error-container">
                        <h2>Errors</h2>
                        <ul>
                        {errors.map((error, idx) => {
                            return <li key={idx}>{error}</li>
                        }
                        )}
                        </ul>
                    </div>
                    ) : null}
                </>
            )}
        </>
    )
}

export default BeatSaveForm