'use client'

import React, {useEffect,useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast  from "react-hot-toast";
import useGlobalContextProvider from "../ContextApi";
import { useRouter } from "next/navigation";

function DropDown(props) {
    const {dropDownToggleObject, threeDotsPositionsObject,selectedQuizObject,allQuizzes,setAllQuizzes} = useGlobalContextProvider();
    const {dropDownToggle, setDropDownToggle} = dropDownToggleObject;
    const {threeDotsPositions} =threeDotsPositionsObject;
    const {selectedQuiz,setSelectedQuiz} = selectedQuizObject;
    const [isDialogOpened, setIsDialogOpened] = useState(false)
    const dropDownRef = useRef(null);
    const router = useRouter();
    
    const menuItems =[
        {name: 'Modify',icon: faPencil},
        {name:  'Delete', icon: faTrash},
    ];

    useEffect(() =>{
        function handleOutiseClick(event){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                if(!isDialogOpened){
                    setSelectedQuiz(null);
                }
                setDropDownToggle(false);
            }
        }
        document.addEventListener('click', handleOutiseClick);
        return()=>{
            document.removeEventListener('click', handleOutiseClick);
        };
    },[dropDownToggle]);

    function deleteTheQuiz(){
        const updateAllQuizzes = allQuizzes.filler((quiz) => {
            if(quiz.id !== selectedQuiz.id){
                return quiz;
            }
        });

        setAllQuizzes(updateAllQuizzes);
        toast.success ('The quiz has been deleted successfully')
        setIsDialogOpened(false);
        setSelectedQuiz(null);
    }

    console.log(selectedQuiz);

    function handleClickedItem(menuItem) {
        if(menuItem.name === 'Modify'){
            router.push('/quiz-build');
        }

        if(menuItem.name === 'Delete'){
            setIsDialogOpened(true);
            toast(
                (t)=>(
                    <div className="flex flex-col gap-4">
                        <div>
                            Do you really want to delete ({selectedQuiz.quizTitle}) Quiz ?
                        </div>
                        <div className="flex gap-3 w-full jusitify-center">
                            <button className="bg-red-700 text-white p-1 w-[100px] rounded-md" 
                            onClick={()=>{
                                deleteTheQuiz();
                                toast.dismiss(t.id);
                            }}>
                                Yes
                            </button>
                            <button className="bg-white text-green-700 p-1 w-[100px] border border-red-700
                            rounded-md hover:text-white hover:bg-red-700"
                            onClick={()=>{
                            toast.dismiss(t.id);
                            setIsDialogOpened(false);
                            setSelectedQuiz(null);
                            }}>No
                            </button>
                        </div>
                    </div>
                ),
                {
                    duration:'10000',
                    id: 'deleteQuiz',
                },
            );
        }
        setDropDownToggle(false);
    }


    return (
        <div style = {{left: threeDotsPositions.x, top: threeDotsPositions.y}}
        ref = {dropDownRef} className={` p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white
        poppins poppins-light text-[13px] ${dropDownToggle ? 'visible': 'invisible'} `}>
            {menuItems.map((menuItem, index)=>(
                <div key = {index} className = "flex border items-center gap-2 text-red-700 border-gray-200 cursor-pointer hover:bg-red-700 hover:text-white p-2 rounded-lg select-none">
                    <FontAwesomeIcon 
                    icon = {menuItem.icon} 
                    className = "size-4" />
                    <div className=" ">{menuItem.name}</div>
                </div>
            ))}
        </div>

    );
}

export default DropDown;