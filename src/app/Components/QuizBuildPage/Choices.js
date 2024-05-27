'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef, createRef, useRef } from "react";
import toast, {Toaster} from 'react-hot-toast';

function Choices({
    singleQuestion,
    questionIndex,
    quizQuestions,
    setQuizQuestions,
    onChangeChoice,
    prefixes,
}){
    const {choices} = singleQuestion;
    const alphabets = ['A', 'B', 'C', 'D'];
    const positions = ['First','Second', 'Third','Fourth'];

    function addANewChoice(){
        const quizQuestionsCopy = [...quizQuestions];
        const lastChoicesPosition = quizQuestionsCopy[questionIndex].choices.length;

        for(let i = lastChoicesPosition -1 ; i >=0 ; i--){
            const eachInput = quizQuestionsCopy[questionIndex].choices[i].substring(2);
            if(eachInput.trim(' ').length === 0){
                return toast.error(
                    `Please fill all the choices before adding a new choice`
                );
            }
        }

        if(lastChoicesPosition < 4){
            const newChoice = `${alphabets[lastChoicesPosition]}. `;
            quizQuestionsCopy[questionIndex].choices.push(newChoice);
            setQuizQuestions(quizQuestionsCopy);
        }
    }

    function deleteChoiceFunction(choiceIndex){
        const quizQuestionsCopy = [...quizQuestions];
        quizQuestionsCopy[questionIndex].choices.splice(choiceIndex,1);
        setQuizQuestions(quizQuestionsCopy);
    }



    return(
        <div className=" border border-gray-300 flex gap-[39px] items-center mt-3">
            <div className="text-[15px]">Choices</div>
            <div className="border border-gray-200 rounded-md p-2 w-full">
                {/* List of choices */}
                {choices.map((singleChoice,choiceIndex)=>(
                    <div key={choiceIndex} className="flex gap-2 items-center mt-3 relative">
                        <span>{alphabets[choiceIndex]}:</span>
                        <input
                            value={singleChoice}
                            onChange={(e)=>{
                                handleChoiceChangeInput(
                                    e.target.value,
                                    choiceIndex,
                                    questionIndex,
                                );
                            }}
                            className="border text-[13px] border-gray-20 p-2 w-full rounded-md outline-none pr-10" 
                            placeholder={`Add your ${positions[choiceIndex]}  choice`}/>
                        {choiceIndex >=2 && (
                            <FontAwesomeIcon className="text-red-600 absolute top-2 right-3 cursor-pointer"
                            icon={faXmark} width={10} height={10} 
                            onClick={() =>{
                                deleteChoiceFunction(choiceIndex);
                            }} />
                        )}
                        </div>
                    ))}
                
                <div className="w-full flex justify-center mt-3">
                    <button 
                    onClick={() =>{
                        addANewChoice();
                    }}
                    className="p-3 bg-red-700 rounded-md text-white w-[210px] text-[13px]">
                        Add new choice
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Choices;