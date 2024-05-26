'use client';
import React from "react";
import {faCode,faEllipsis,faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from "next/image";
import Link from "next/link";
import useGlobalContextProvider from "../ContextApi";

function successRate(singleQuiz) {
    let correctQuestions = 0;
    let totalAttemptes = 0;
    let successRate = 0;
    
    singleQuiz.quizQuestions.forEach((question) => {
        totalAttemptes += question.statistics.totalAttempts;
        correctQuestions += question.statistics.correctAttempts;
        
    });

    successRate = Math.ceil((correctQuestions /totalAttemptes)*100 );
    return successRate;
}

function QuizCard({singleQuiz}) {
    const { quizToStartObject } = useGlobalContextProvider();
    const { setSelectQuizToStart } = quizToStartObject; 
    const { quizTitle, quizQuestions, icon } = singleQuiz;
    const totalQuestions = quizQuestions.length ;
    const globalSuccessRate = successRate(singleQuiz);

    return(
        <div className="rounded-[10px] flex flex-col gap-2 border border-red-300 bg-white p-4 ">
            <div className="relative bg-red-700 w-full h-32 justify-between items-center rounded-[10px]">
                <div className="absolute cursor-pointer top-3 right-3">
                    <FontAwesomeIcon className="text-white"
                    height={13}
                    width={13}
                    icon={faEllipsis}
                    />
                </div>
                <FontAwesomeIcon className="text-white"
                    height={80}
                    width={80}
                    icon={icon}
                />
            </div>
            <h3 className ="font-bold">{quizTitle}</h3>
            <p className ="text-sm font-light">{totalQuestions} question(s)</p>
            <div className ="flex gap-3">
                <div className="flex gap-1 items-center">
                    <span className="text-[12px]">Success rate: {globalSuccessRate}%</span>
                </div>
                <div
                    onClick={() =>{
                        setSelectQuizToStart(singleQuiz);
                    }}
                    className=" rounded-full w-7 h-7 bg-red-700 flex items-center justify-center cursor-pointer">
                    <Link href="/quiz-start">
                        <FontAwesomeIcon className="text-white" 
                            width={15} 
                            height={15}
                            icon={faPlay}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default QuizCard;