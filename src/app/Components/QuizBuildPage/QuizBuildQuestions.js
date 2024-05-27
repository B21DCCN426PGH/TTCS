'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef, createRef, useRef } from "react";
import {useState,useEffect, useLayoutEffect} from "react";
import {v4 as uuidv4} from 'uuid';
import toast, {Toaster} from 'react-hot-toast';
import Choices from "./Choices";


function QuizBuildQuestions({focusProp, quizQuestions, setQuizQuestions}){
    const prefixes = ['A', 'B', 'C','D'];
    // const [quizQuestions, setQuizQuestions] = useState([
    //     {id:uuidv4, mainQuestion: '' , 
    //     choices: prefixes.slice(0,2).map((prefix) => prefix +'. '),
    //     correctAnswer: '',
    //  },
    // ]);

    const {focus, setFocusFirst} = focusProp;
    const endOfListRef = useRef(null);
    const textAreaRefs = useRef(quizQuestions.map (()=> createRef()));

    console.log(quizQuestions)

    function addNewQuestion() {

        setFocusFirst(false);
        const lastIndexQuizQuestions = quizQuestions.length-1;
        if(quizQuestions[lastIndexQuizQuestions].mainQuestion.trim(' ').length === 0){

            toast.error(`The question ${lastIndexQuizQuestions+1} is still empty!`);
            textAreaRefs.current[lastIndexQuizQuestions].current.focus();
            return;
        }

        for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
            const singleChoice = choice.substring(2);
            if(singleChoice.trim(' ').length === 0){
                return toast.error (
                    `Please sure that all prev choices are filled`
                );
            }
        }

        if(quizQuestions[lastIndexQuizQuestions].correctAnswer.length === 0){
            return toast.error(`Please ensure to fill out the correct answer`);
        }

        const newQuetion = {
            id: uuidv4(), mainQuestion: '',
            choices: prefixes.slice(0,2).map((prefix) => prefix +'. '),
            correctAnswer: '',
        };
        setQuizQuestions([...quizQuestions, newQuetion]);
        textAreaRefs.current= [...textAreaRefs.current, createRef()];
    }

    console.log (textAreaRefs);

    function deleteQuestion(singleQuestion) {
        const quizQuestionsCopy = [...quizQuestions];
        const filterQuestionToDelete = quizQuestionsCopy.filter(
            (question) => singleQuestion.id !== question.id,
        );
        const updatedRefs = textAreaRefs.current.filter((ref,index) =>{
            return quizQuestions[index].id !== singleQuestion.id;
        });
        textAreaRefs.current =updatedRefs;
        setQuizQuestions(filterQuestionToDelete);
    }

    function handleInputChange(index, text){
        const updatedQuestions = quizQuestions.map((question,i) => {
            if(index === i){
                return{ ...question, mainQuestion: text };
            }
            return question;
        });
        setQuizQuestions(updatedQuestions);
}

    function updateTheChoicesArray(text, choiceIndex, questionIndex){
        console.log ('text', text);
        console.log ('choiceIndex', choiceIndex);
        console.log ('questionIndex', questionIndex);

        const updatedQuestions = quizQuestions.map((question,i) =>{
            if(questionIndex === i ){
                const updatedChoices = question.choices.map((choice, j) => {
                    if(choiceIndex === j){
                        return prefixes[j] + '. '+ text;
                    } else {
                        return choice;
                    }
                });
                return { ...question,choices: updatedChoices};
            }
            return question;
        });
        setQuizQuestions(updatedQuestions);
    }

    function updateCorrectAnswer(text,questionIndex){
        const correctAnswerArray =['A', 'B', 'C', 'D'];
        console.log(correctAnswerArray.indexOf(text));
        const questionsCopy = [...quizQuestions];
        questionsCopy[questionIndex].correctAnswer= correctAnswerArray.indexOf(text);
        setQuizQuestions(questionsCopy);
    }

    useLayoutEffect(() => {
        if(endOfListRef.current){
            console.log(endOfListRef)
            setTimeout(()=>{
                endOfListRef.current.scrollIntoView({behavior: 'smooth'});
            },100);
        }
    }, [quizQuestions.length]);
    
    console.log(quizQuestions);

    useEffect(() => {
        const lastTextAreaIndex = quizQuestions.length - 1;
        if(lastTextAreaIndex >= 0){
            const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
            if(lastTextArea){
                lastTextArea.focus();
            }
        }
    },[quizQuestions.length, textAreaRefs.current]);

    return(
        <div className="p-3 mt-6 flex justify-between border border-red-700 rounded-md">
            <div className="flex gap-2 flex-col w-full">
                <div className="flex -gap-2 items-center">
                    <div className="bg-red-700 px-4 py-1 rounded-md text-white">2</div>
                    <span className="font-bold">Quiz Questions: </span>
                </div>
                {QuizBuildQuestions.map((singleQuestion,questionIndex) => (
                    <div ref = {quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
                    key={questionIndex} className="border ml-5 p-4 mt-4 border-red-700 
                    border-opacity-50 rounded-md flex justify-center relative">
                        <SingleQuestion questionIndex={questionIndex}
                        value={singleQuestion.mainQuestion}
                        ref = {textAreaRefs.current[questionIndex]}
                        onChange={(e)=>{
                            handleInputChange(questionIndex,e.target.value);
                        }} />
                        <Choices
                            questionIndex={questionIndex}
                            singleQuestion={singleQuestion}
                            quizQuestions={quizQuestions}
                            setQuizQuestions={setQuizQuestions}
                            onChange={(text, choiceIndex, questionIndex)=>{
                                updateTheChoicesArray(text, choiceIndex,questionIndex);
                            }}
                            value = {singleQuestion.choices}
                            prefixes = {prefixes}
                        />
                        {questionIndex !== 0 && (
                            <FontAwesomeIcon icon={faXmark} height={10} width={10}
                            className="text-red-600 absolute top-2 right-3 cursor-pointer"
                            onClick={() => {
                                deleteQuestion(singleQuestion);
                            }}
                        />
                        )}
                        <CorrectAnswer 
                            onChangeCorrectAnswer={(text) =>{
                            updateCorrectAnswer(text,questionIndex);
                            }}
                            singleQuestion={singleQuestion}
                        />
                    </div>
                ))}
                <div className="w-full flex justify-center mt-3">
                    <button
                        onClick={()=> {
                            addNewQuestion();
                        }} className="p-3 bg-red-700 rounded-md text-white w-[210px] text-[13px]">
                            Add New Question
                        </button>
                </div>
            </div>
        </div>
    )
}

export default QuizBuildQuestions;

function CorrectAnswer({onChangeCorrectAnswer,singleQuestion}){
    const[correctAnswerInput,setCorrectAnswerInput] = useState(
        singleQuestion.correctAnswer,
    );
    const prefixes = ['A', 'B', 'C' , 'D'];

    function handleOnChangeInput(text){
        const upperText = text.toUpperCase();
        for(const choice of singleQuestion.choices){
            const eachChoice = choice.substring(0,1);
            if(upperText === '' || upperText === eachChoice){
                
                console.log(upperText);
                console.log(eachChoice);
                setCorrectAnswerInput(upperText);
                onChangeCorrectAnswer(upperText); 
            }
        }
    }
    console.log(singleQuestion);
    return(
        <div className="flex gap-1 items-center mt-3">
            <div className="text-[15px]">Correct Answer</div>
            <div className="border border-gray-200 rounded-md p-1 w-full">
                <input
                    value={prefixes[correctAnswerInput]}
                    maxLength={1}
                    onChange={(e)=>{
                        handleOnChangeInput(e.target.value);
                    }}
                    className="p-3 outline-none w-full text-[13px]"
                    placeholder="Add the correct answer..."
                />
            </div>
        </div>
    );
}


const SingleQuestion = forwardRef (
    function SingleQuestion ({questionIndex, value, onChange},ref,){
        console.log(questionIndex);
        return(
            <div className="w-full">
                <div className="flex gap-3 items-center">
                    <div className="text-[15px] border-gray-200 flex gap-2">
                        <span>Question</span>
                        <span>{questionIndex + 1 }</span>
                    </div>
                    <textarea className="border border-gray-200 rounded-md p-3 ml-3 full h-[35px] resize-none text-[13px] outline-none"
                    placeholder="Enter question here"
                    value={value}
                    onChange={onChange}
                    ref={ref}/>
                </div>
            </div>
        );
    }
);



