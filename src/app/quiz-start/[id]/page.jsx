'use client';
import useGlobalContextProvider from "@/app/ContextApi";
import {faCode, faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';
import QuizStartHeader from 'D:/Web/tracnghiem/tracnghiem/tracnghiem/src/app/Components/QuizStartPage/QuizStartHeader.js';
import QuizStartQuestions from 'D:/Web/tracnghiem/tracnghiem/tracnghiem/src/app/Components/QuizStartPage/QuizStartQuestions';

function Page (props){
    const {allQuizzes, quizToStartObject } = useGlobalContextProvider();
    const { selectQuizToStart} = quizToStartObject;
    const [parentTimer,setParentTimer] = useState(5);
    const router = useRouter();

    useEffect(()=> {
        if(selectQuizToStart === null){
            router.push('/');
        }
    },[]);

    function onUpdateTime(currentTime){
        setParentTimer(currentTime);
    }

    return (
        <div className = "poppins flex flex-col px-24 mt-[35px]">
            {selectQuizToStart === null ? (
                <div className="h-svh flex flex-col gap-2 items-center justify-center">
                    <Image src="/errorIcon.png" alt= "" width={180} height={180}/>
                    <h2 className="text-xl font-bold">
                        Please select your quiz
                    </h2>
                    <span className="font-light">
                        You will be redirected to the home page 
                    </span>
                </div>
            ) : (
            <>
                <QuizStartHeader parentTimer={parentTimer} />
                <div className = "mt-10 flex items-center justify-center">
                    <QuizStartQuestions onUpdateTime={onUpdateTime} />
                </div>
            </>
           
            )}
        </div> 
    );
}

export default Page;

// function QuizStartQuestion(){
//     return(
//         <div className="poppins rounded-sm m-9 w-9/12">
//             <div className="flex gap-2 items-center justify-center">
//                 <div className="flex bg-red-700 items-center justify-center rounded-md w-11 h-11 p-3 text-white">
//                     1
//                 </div>
//                 <p>
//                     cau 1
//                 </p>
//             </div>
//             <div className="mt-7 flex flex-col gap-2">
//                 <div className="bg-red-700 p-3 ml-11 w-10/12 rounded-md border-red-700 text-white ">
//                         A: dap an a
//                 </div>
//                 <div className="p-3 ml-11 w-10/12 rounded-md border-red-700 ">
//                         B: dap an b
//                 </div>
//                 <div className="p-3 ml-11 w-10/12 rounded-md border-red-700 ">
//                         C: dap an c
//                 </div>
//                 <div className="p-3 ml-11 w-10/12 rounded-md border-red-700 ">
//                         D: dap an d
//                 </div>
//             </div>
//             <div className=" flex justify-end mt-7">
//                 <button className=" p-2 px-5 text-[15px] text-white rounded-md bg-red-700 mr-[70px]">
//                     Submit
//                 </button>
//             </div>
//         </div> 
//     );
// }

// function QuizStartHeader(){
//     return (
//         <div className="flex justify-between">
//             <div className="flex gap-2 justify-center">
//                 <div className="bg-red-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
//                     <FontAwesomeIcon
//                         className="text-white"
//                         width={25}
//                         height={25}
//                         icon={faCode}
//                     />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <h2 className="font-bold text-xl">Ptit Quiz</h2>
//                     <span className="font-light text-sm"> 20 Questions</span>
//                 </div>
//             </div>
//             <div className="flex gap-2 items-center">
//                 <FontAwesomeIcon 
//                     className="text-red-700"
//                     width={20}
//                     height={20}
//                     icon={faStopwatch}
//                 />
//                 <span className="font-bold text-white">00:30:00</span>
//             </div>
//         </div>
//     );
// }