'use client';

import React, {useEffect, useState} from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';

function QuizStartQuestions({onUpdateTime}){
    const time =15;
    const { quizToStartObject, allQuizzes,setAllQuizzes } = 
    useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject
    const { quizQuestions } = selectQuizToStart;
    const [ currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [ selectedChoice, setSelectedChoice] = useState(null);
    const [ indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
    const [ isQuizEnded, setIsQuizEnded] = useState(false);
    const [ score, setScore] = useState(0);
//
    const [ timer,setTimer] = useState(time);
    let interval;

    function startTimer(){
        clearInterval(interval);
        setTimer(time);
        interval = setInterval(() => {
            setTimer((currentTimer) => {
                onUpdateTimer(currentTimer);
                if(currrentTime ===0 ){
                    clearInterval(interval);
                    return 0;
                }
                return currrentTime -1;
            });
        },1000);
            
    }

    useEffect(() => {
        startTimer();
        return()  => {
            clearInterval(interval);
        }
    },[currentQuestionIndex]);

    useEffect(()=>{
        if(timer === 0 && !isQuizEnded){
            const currentQuizzes = [...allQuizzes];
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.totalAttempts +=1;
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.incorrectAttempts += 1;

            setAllQuizzes(currentQuizzes);

            if(currentQuestionIndex !== quizQuestions.length -1){
                setTimeout(() =>{
                    setCurrentQuestionIndex((current) =>{
                        return current +1;
                    });
                },1000);
            } else{
                setIsQuizEnded(true);
                clearInterval(interval);
            }
        }
    },[timer]);

    console.log(allQuizzes);


    useEffect(() =>{
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id,
        );
        setIndexOfQuizSelected(quizIndexFound);
    },[]);

    useEffect(() =>{
        if(isQuizEnded){
            console.log("quiz has ended...");
             
            quizQuestions.forEach((quizQuestion) => {
                quizQuestion.answerResult = -1;
                
            });
            
        }
    },[isQuizEnded]);

    function selectChoiceFunction (choiceIndexClicked){
        setSelectedChoice(choiceIndexClicked);
        const currentAllQuizzes = [...allQuizzes];
        currentAllQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex].answerResult = choiceIndexClicked;
            
        setAllQuizzes(currentAllQuizzes);
        
    }

    function moveToTheNextQuestion(){
        if(allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult === -1){
            toast.error("please select an answer");
            return;
        }
        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.totalAttempts +=1;
        if(
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult !==
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer
        ){
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.incorrectAttempts +=1;
            toast.error("incorrect answer"); 
            
            if (currentQuestionIndex != quizQuestions.length - 1){
                setTimeout(() => {
                    setCurrentQuestionIndex((current) =>current+1);
                    setSelectedChoice(null);
                },1200);
            } else {
                setTimer(0);
                clearInterval(interval);
                setIsQuizEnded(true);
            }
            return ;
        }
        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.correctAttempts +=1;
        
        setScore((prevState) => prevState + 1 )

        toast.success("correct answer");
        
        if(currentQuestionIndex === quizQuestions.length-1 && 
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult ===
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer){
            
                setTimer(0);
                clearInterval(interval);
                setIsQuizEnded(true);
                return;
        }
        setTimeout(() =>{
            setCurrentQuestionIndex((current) => current+1);
            setSelectedChoice(null);
        }, 2000);
        
    }
    console.log(allQuizzes);
    return (
        <div className=" relative poppins rounded-sm m-9 w-9/12 ">
            <Toaster
                toastOptions = {{
                    className: '',
                    duration: 1500,
                    style: {
                        padding : '12px',
                    },
                }}    
            />
            <div className="flex gap-2 items-center justify-center">
                <div className="flex bg-red-700 items-center justify-center rounded-md w-11 h-11 p-3 text-white">
                    {currentQuestionIndex +1}
                </div>
                <p> {quizQuestions[currentQuestionIndex].mainQuestion}        </p>
            </div>
            <div className="mt-7 flex flex-col gap-2">
                {quizQuestions[currentQuestionIndex].choices.map((choice, indexChoice)=>{
                    <div key={indexChoice}
                    onClick={() =>{
                        selectChoiceFunction(indexChoice);
                    }}
                    className={`p-3 ml-11 w-10/12 border border-red-700 
                    rounded-md hover:bg-green-700 hover:text-white transition-all select-none ${
                        selectedChoice === indexChoice ? 
                        'bg-red-700 text white' : 'bg-white'
                    }`}>
                        {choice}
                    </div>
                },
                )}
            </div>
            <div className=" flex justify-end mt-7">
                <button onClick={()=>{
                    moveToTheNextQuestion()

                }}
                disabled={isQuizEnded ? true : false}
                className={` p-2 px-5 text-[15px] text-white rounded-md bg-red-700 mr-[70px] ${
                    isQuizEnded ? 'opacity-60' : ' opacity-100'
                } `}>
                    Submit
                </button>
            </div>
            {
                isQuizEnded && (
                    <ScoreComponent quizStartParentProps={{
                        setIsQuizEnded,
                        setCurrentQuestionIndex,
                        setIndexOfQuizSelected,
                        setSelectedChoice,
                        score,
                        setScore,
                    }}
                    />
                )
            }
        </div> 
    );
}

export default QuizStartQuestions;

function ScoreComponent({ quizStartParentProps}){
    const {quizToStartObject,allQuizzes} = useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObject;
    const numberOfQuestions = selectQuizToStart.quizQuestions.length;
    const router = useRouter();
    const{
        setIsQuizEnded,
        setCurrentQuestionIndex,
        setIndexOfQuizSelected,
        setSelectedChoice,
        score,
        setScore,
    } = quizStartParentProps;

    function emojiIconScore (){
        const emojiFaces = [
            'confused-emoji.png',
            'happy-emoji.png',
            'very-happy-emoji.png',
        ];
        const result = (score / selectQuizToStart.quizQuestions.length) *100;

        if (result<25){
            return emojiFaces[0];
        }
        if (result == 50) {
            return emojiFaces[1];
        }

        return emojiFaces[2];
        
    }
    console.log(emojiIconScore());

    function tryAgainFunction(){
        setIsQuizEnded(false);
        const newQuizIndex = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id,
        );
        setIndexOfQuizSelected(newQuizIndex);
        setCurrentQuestionIndex(0);
        setSelectedChoice(null);
        setScore(0);
        console.log(selectQuizToStart);
    }
    return(
        <div className=" flex items-center justify-center rounded-md top-[-100px] border  border-gray-100">
            <div className="flex flex-col items-center justify-center gap-4">
                <img src={`/${emojiIconScore()}`} alt="emoji" width={100} height={100} />
                <div className="flex gap-1 flex-col">
                    <span className="font-bold text-2xl">Your Score</span>
                    <div className="text-[22px] text-center">
                        {score}/{numberOfQuestions}
                    </div>
                </div>
                <button onClick={() => tryAgainFunction()} 
                className="p-2 bg-red-700 rounded-md text-white px-6">
                    Try Again
                </button>
                {/*stactistic*/}
                <div className="w-full flex gap-2 flex-col mt-3">
                    <div className='flex gap-1 items-center justify-center'>
                        <span className='text-[-14px]'>Correct answers: {score}</span>
                    </div>
                    <div className='flex gap-1 items-center justify-center'>
                        <span className='text-[-14px]'>Incorrect answers: {selectQuizToStart.quizQuestions.length - score}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
