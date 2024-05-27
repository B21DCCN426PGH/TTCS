'use client';

import { createContext,useContext,useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
const GlobalContext = createContext();

export function ContextProvider({children}) {
    const defaultUser ={
        id:1,
        name:"PhamHung",
        isLogged:false,
        experience:0,
    };
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user,setUser] = useState(() =>{
        // const saveUserData = localStorage.getItem('user');
        // let saveUserData;
        // if (typeof window !== 'undefined') {
        //     saveUserData = localStorage.getItem('user');
        //     console.log('saveUserData', saveUserData);
        // }
        // return saveUserData ? JSON.parse(saveUserData) : defaultUser;

        const saveUserData = localStorage.getItem('user');
        try {
            return saveUserData ? JSON.parse(saveUserData) : defaultUser;
        } catch (e) {
            console.error("Failed to parse user data:", e);
            return defaultUser;
        }
    });

    const [openIconBox, setOpenIconBox] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState({ faIcon : faQuestion});
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [threeDotsPositions, setThreeDotsPositions] = useState({x:0, y:0});
    const [userXP,setUserXP] =useState(() =>{
        // const saveUserData = localStorage.getItem('user');
        // return saveUserData ? JSON.parse(saveUserData).experience : 0;

        const saveUserData = localStorage.getItem('user');
        try {
            return saveUserData ? JSON.parse(saveUserData).experience : 0;
        } catch (e) {
            console.error("Failed to parse user experience data:", e);
            return 0;
        }
    });
    const [selectedQuiz,setSelectedQuiz] = useState(null);
    useEffect(() =>{
        localStorage.setItem('user',JSON.stringify(user));
    }, [user]);

    useEffect(()=>{
        setAllQuizzes(quizzesData);
    },[]);

    useEffect(()=>{
        setUser((prevUser)=> ({
            ...prevUser,
            experience:userXP,
        }));
    },[userXP]);

    console.log(allQuizzes);

    useEffect(() =>{
        if(selectedQuiz){
            setSelectedIcon({faIcon: selectedQuiz.icon});
        } else {
            setSelectedIcon({faIcon: faQuestion});
        }
    }, [selectedQuiz]);

   
        return (
        <GlobalContext.Provider value={{
            allQuizzes,
            setAllQuizzes,
            quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
            userObject: { user, setUser},
            openBoxToggle: {openIconBox,setOpenIconBox},
            selectedIconBoxObject: {selectedIcon,setSelectedIcon},
            dropDownToggleObject: {dropDownToggle, setDropDownToggle},
            threeDotsPositionsObject: {threeDotsPositions, setThreeDotsPositions},
            selectedQuizObject: {selectedQuiz, setSelectedQuiz},
            userXpObject: {userXP, setUserXP},
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalContextProvider() {
    return useContext(GlobalContext);
}