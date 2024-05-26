'use client';
import Navbar from "./Components/Navbar";
import {faCode,faEllipsis,faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import QuizzesArea from "./Components/QuizzesArea";
import useGlobalContextProvider from "./ContextApi";
import { useEffect } from "react";


export default function Home(){
    const { quizToStartObject} = useGlobalContextProvider();
    const {setSelectQuizToStart} = quizToStartObject;

    useEffect(()=>{
        setSelectQuizToStart(null);
    },[]);
    return (

        <div>
            <header>
                <Navbar />
            </header>
            <QuizzesArea />
        </div>
    )
}