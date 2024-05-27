'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav';
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions';
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle';
import useGlobalContextProvider from '../ContextApi';
import IconsComponents from '../Components/QuizBuildPage/IconsComponents';
function Page(props ){
    const prefixes = ['A','B', 'C', 'D'];
    const {selectedIconObject,selectedQuizObject} = useGlobalContextProvider();
    const {selectedIcon} = selectedIconObject ;
    const {selectedQuiz} = selectedQuizObject ;

    const [focusFirst, setFocusFisrt] = useState(true);
    const [quizQuestions, setQuizQuestions] = useState(() =>{
        if(selectedQuiz){
            return selectedQuiz.quizQuestions;
        } else {
            return [
                {
                    id:uuidv4(),
                    mainQuestion: '',
                    choices: prefixes.slice(0,2).map((prefix) => prefix + '. '),
                    correctAnswer: ' ',
                    answeredResult: -1,
                    statistics: {
                        totalAttempts: 0,
                        correctAttempts:0,
                        incorrectAttempts:0,
                    },
                },
            ];
        }
    });

    console.log(selectedIcon.faIcon);

    const [newQuiz, setNewQuiz] = useState(()=>{
        if(selectedQuiz){
            return selectedQuiz;
        } else {
            return {
                id: uuidv4(),
                icon: selectedIcon.faIcon,
                quizTitle: '',
                quizQuestions: quizQuestions,
            };
        }    
    });

    useEffect(() => {
        setNewQuiz((prevQuiz) =>({
            ...prevQuiz,
            icon: selectedIcon.faIcon,
            quizQuestions: quizQuestions,
        }));
    },[quizQuestions,selectedIcon.faIcon]);

    console.log(newQuiz)

    function onChangeQuizTitle(text){
        setNewQuiz((preQuiz)=> ({ ...preQuiz, quizTitle:text }));
    }

    const quizNavBarProps = {
        quizQuestions,
        newQuiz,
    }

    const quizTitleProps = {
        focusProp: { focus: focusFirst, setFocusFisrt},
        onChangeQuizTitle,
    };
    const quizQuestionsProps = {
        focusProp: { focus: !focusFirst, setFocusFisrt},
        quizQuestions,
        setQuizQuestions,
    };
    return (
        <div className="mx-16 poppins">
            <QuizBuildNav {...quizNavBarProps} />
            <QuizBuildTitle {...quizTitleProps} />
            <QuizBuildQuestions {...quizQuestionsProps} />
        </div>
    );
}

export default Page;