import React, { useState } from "react";

import { storage } from "../firebase/firebase";

import { useDispatch } from "react-redux";
import { loading, setSample } from "../actions/drumMachine";
import { addSample } from "../actions/samples";

const padURL = 'http://localhost:3000/api/v1/pads/'

const AddSampleForm = (props) => {
    const dispatch = useDispatch()

    // Controlled form for adding a sample
    const [sampleForm, setSampleForm] = useState({ name: "", type: "" });
    const handleChange = (e) => {
        setSampleForm({ ...sampleForm, [e.target.name]: e.target.value });
    };
    const [selectedFile, setSelectedFile] = useState(null);

    // Errors if user doesn't pass validations
    const [errors, setErrors] = useState([]);
    // Catches success message from backend and renders on page before model unmounts
    const [message, setMessages] = useState('');

    const handleFileInput = (e) => {
        setErrors([])
        const file = e.target.files[0]
        const fileTypeRegex = /audio\/.+/
        const newErrors = []
        if (file) {
            // console.log(file.type)
            if (file.size > 1048576) {
                newErrors.push('File size cannot exceed more than 1MB')
            }
            if (!fileTypeRegex.test(file.type)) {
                newErrors.push('File must be an audio file.')
            } else {
                setSelectedFile(file)
            }
        }
        setErrors(newErrors)
    }
    
    const handleSubmit = () => {
        // upload file to filebase storage
        const uploadTask = storage.ref(`samples/${selectedFile.name}`).put(selectedFile)
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => { 
                const newErrors = []
                newErrors.push(error)
                setErrors(newErrors)
            },
            () => {
                handleFetch()
            })
    }

    const handleFetch = () => {
        const token = localStorage.getItem("jwt")
        const newPad = {
            name: sampleForm.name,
            sample_type: sampleForm.type,
            sample_file: selectedFile.name
        }
        const configObj = {
            method: 'POST',
            headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
            body: JSON.stringify(newPad) 
        }
        fetch(padURL, configObj)
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                const newErrors = [];
                data.error.forEach(error => newErrors.push(error))
                setErrors(newErrors)
            } else if (data.message) {
                console.log(data)
                setMessages(data.message)
                dispatch(setSample(data.pad))
                dispatch(addSample(data.pad))
                dispatch(loading(false))
                setTimeout(() => props.close(), 1000)
            }
        })
    }

    return (
        <>
            {message.length ? (
                <div>
                    <p>{message}</p>
                </div>
            ) :
                <>
                    <h4>Enter Sample Info</h4>
                    <label htmlFor="name">Sample Name</label>
                    <input
                        name="name"
                        value={sampleForm.name}
                        onChange={handleChange}
                    ></input>
                    <p>Type</p>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="kick"
                            checked={sampleForm.type === 'kick'}
                            onChange={handleChange}
                        />
                        kick
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="snare"
                            checked={sampleForm.type === 'snare'}
                            onChange={handleChange}
                        />
                        snare
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="clap"
                            checked={sampleForm.type === 'clap'}
                            onChange={handleChange}
                        />
                        clap
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="hi-hat"
                            checked={sampleForm.type === 'hi-hat'}
                            onChange={handleChange}
                        />
                        hi-hat
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="cymbal"
                            checked={sampleForm.type === 'cymbal'}
                            onChange={handleChange}
                        />
                        cymbal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="percussion"
                            checked={sampleForm.type === 'percussion'}
                            onChange={handleChange}
                        />
                        percussion
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="misc"
                            checked={sampleForm.type === 'misc'}
                            onChange={handleChange}
                        />
                        misc
                    </label>
                    <div className="file-uploader">
                        <input 
                            type="file" 
                            onChange={handleFileInput}
                        />
                    </div>
                    {errors.length ? (
                    <div className="error-container">
                        <h3>Errors</h3>
                        <ul>
                        {errors.map((error, idx) => {
                            return <li key={idx}>{error}</li>
                        }
                        )}
                        </ul>
                    </div>
                    ) : null}
                    <div className="btn-group">
                        <button className="btn update" onClick={handleSubmit} >Submit</button>
                        <button className="btn update" onClick={props.close} >Cancel</button>
                    </div>
                </>
            }
        </>
    )
}

export default AddSampleForm