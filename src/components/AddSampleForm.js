import React, { useRef, useState } from "react";

import { storage } from "../firebase/firebase";

import { useDispatch, useSelector } from "react-redux";


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

    const handleFileInput = (e) => {
        setErrors([])
        const file = e.target.files[0]
        if (file) {
            console.log(file.type)
            if (file.size > 1048576) {
                const newErrors = []
                newErrors.push('File size cannot exceed more than 1MB')
                setErrors(newErrors)
            } else {
                setSelectedFile(file)
            }
        }
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
                // create new Pad (sample model) on the backend
                    // needs to happen first so we can reference the pad_id in the dispatch
                handleFetch()
                // dispatch new sample to selected pad
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
        .then(data => console.log(data))
    }

    return (
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
                <h2>Errors</h2>
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
    )
}

export default AddSampleForm