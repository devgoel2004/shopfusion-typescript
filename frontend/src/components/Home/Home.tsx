import React, {useEffect} from "react";
import './Home.css';
import {FaMouse} from 'react-icons/fa';
import Loader from "../Loader/Loader";
import {useAlert} from 'react-alert';
import {useSelector, useDispatch} from 'react-redux';

function Home(){
    const alert = useAlert();
    const dispatch = useDispatch();
    return (
        <>
          Home
        </>
    )
}

export default Home;