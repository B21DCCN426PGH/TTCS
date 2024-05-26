import React from 'react';
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav';
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions';
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle';

function Page(props ){
    return (
        <div className="mx-16 poppins">
            <QuizBuildNav />
            <QuizBuildTitle />
            <QuizBuildQuestions />
        </div>
    );
}

export default Page;