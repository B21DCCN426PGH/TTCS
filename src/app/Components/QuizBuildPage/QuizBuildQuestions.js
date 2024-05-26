'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef } from "react";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';


function QuizBuildQuestions(props){
    const [quizQuestions, setQuizQuestions] = useState([
        {id:uuidv4, mainQuestion: ''},
    ]);

    const endOfListRef = useRef(null);
    const textAreaRefs = useRef(quizQuestions.map (()=> createRef()));

    function addNewQuestion() {
        const lastIndexQuizQuestions = quizQuestions.length-1;
        if(quizQuestions[lastIndexQuizQuestions].mainQuestion.trim(' ').length === 0){
            console.log ("question input is empty");
            return;
        }

        const newQuetion = {id: uuidv4(), mainQuestion: ''};
        setQuizQuestions([...quizQuestions, newQuetion]);
        textAreaRefs.current= [...textAreaRefs.current, createRef()];
    }

    console.log (textAreaRefs);

    function deleteQuestion(singleQuestion) {
        const quizQuestionsCopy = [...quizQuestions];
        const filterQuestionToDelete = quizQuestionsCopy.filter(
            (question) => singleQuestion.id !== question.id,
        );
        setQuizQuestions(filterQuestionToDelete);
    }

    function handleInputChange(index, text){
        const updateQuestions = quizQuestions.map((question,i) => {
            if(i === index){
                return{ ...question, mainQuestion: text };
            }
            return question;
        });
        setQuizQuestions(updateQuestions);
}

    useEffect(() => {
        if(endOfListRef.current){
            endOfListRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [quizQuestions]);
    
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
                {QuizBuildQuestions.map((singleQuestion,questionInex) => (
                    <div ref = {quizQuestions.length - 1 === questionInex ? endOfListRef : null}
                    key={questionInex} className="border ml-5 p-4 mt-4 border-red-700 
                    border-opacity-50 rounded-md flex justify-center relative">
                        <SingleQuestion questionInex={questionInex}
                        value={singleQuestion.mainQuestion}
                        ref = {textAreaRefs.current[questionIndex]}
                        onChange={(e)=>{
                            handleInputChange(questionInex,e.target.value);
                        }} />
                        {questionInex !== 0 && (
                            <FontAwesomeIcon icon={faXmark} height={10} width={10}
                            className="text-red-600 absolute top-2 right-3 cursor-pointer"
                            onClick={() => {
                                deleteQuestion(singleQuestion);
                            }}
                        />
                        )}
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

const SingleQuestion = forwardRef (
    function SingleQuestion ({questionInex, value, onChange},ref,){
        console.log(questionInex);
        return(
            <div className="w-full">
                <div className="flex gap-3 items-center">
                    <div className="text-[15px] border-gray-200 flex gap-2">
                        <span>Question</span>
                        <span>{questionInex + 1 }</span>
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
)