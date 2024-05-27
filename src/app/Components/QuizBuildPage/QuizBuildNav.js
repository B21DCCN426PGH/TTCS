import React, {useEffect, useState} from "react";
import Image from "next/image";
import useGlobalContextProvider from "@/app/ContextApi";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid';

function validateQuizQuestions (quizQuestions){
    for( let question of quizQuestions){
        if(!question.mainQuestion.trim()){
            return {valid: false, message: 'Please fill in the main question.'};
        }
        if (question.choices.some((choice)=> !choice.trim().substring(2))){
            return {valid: false, message: 'Please fill in all choices.'};
        }

        if(question.correctAnswer.length === 0){
            return {valid:false,message:'Please specify the correct answer.'};
        }
        return {valid:true};
    }

}

function QuizBuildNav({ newQuiz }){
    const { allQuizzes, setAllQuizzes} = useGlobalContextProvider();
    const router = useRouter();
    
    function addNewQuiz() {
        if (newQuiz.quizTitle.trim(' ').length ===0){
            return toast.error('Please add a name for the quiz!');
        }
        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if(isValid.valid === false){
            toast.error(isValid.message);
            return;
        }
        // setAllQuizzes([...allQuizzes, newQuiz]);
        // router.push('/');
    }
    console.log(allQuizzes);
    return(
        <div className="poppins my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/logo.png" alt="" height={50} width={50}/>
                <span className="text-2xl text-red-700 font-bold">
                    Quiz Builder
                </span>
            </div>
            <button className="p-2 px-4 bg-red-700 rounded-md text-white">
                Save
            </button>
        </div>
    );
}

export default QuizBuildNav;