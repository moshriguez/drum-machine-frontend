import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const beatURL = 'http://localhost:3000/api/v1/beats/'

const BeatSaveForm = (props) => {
    const { name, description, tempo, pad1, pad2, pad3, pad4 } = useSelector(state => state.drumMachine)
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


    const handleSubmit = () => {
        const token = localStorage.getItem("jwt")
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
            method: 'POST',
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
              setTimeout(() => props.handleShowSaveBeat(), 1000)
          }
        });
    }

    return (
        <div>
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
                    <input
                        name="description"
                        placeholder="Description"
                        value={beatForm.description}
                        onChange={handleChange}
                    ></input>
                    <button className="btn cancel" onClick={props.handleShowSaveBeat} >Cancel</button>
                    <button className="btn submit" onClick={handleSubmit} >Submit</button>
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
        </div>
    )
}

export default BeatSaveForm