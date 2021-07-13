import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { reset } from "../actions/drumMachine";

import DrumMachine from '../components/DrumMachine';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset())
    })
    return (
        <>
            <DrumMachine />
        </>
    )
}

export default Home