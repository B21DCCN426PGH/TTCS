'use client'
import React from "react";
import Image from "next/image";
import useGlobalContextProvider from "../ContextApi";

function Navbar(props){
  const userXpObject = useGlobalContextProvider();
    const { userObject } = userXpObject;
    const { user, setUser } = userObject;
    const { userXP } = userXpObject;

    // Example user object
    // { id: 1, name: 'Ali', isLogged: false, experience: 0 }

    function changeTheLoginState() {
        const userCopy = { ...user };
        userCopy.isLogged = !userCopy.isLogged;
        
        setTimeout(() => {
            setUser(userCopy);
        }, 600);
    }
    return(
        <nav className="poppins mx-auto max-w-screen-xl p-4  sm:px-8 sm:py-5 lg:px-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <a className="flex gap-1 items-center">
                <img src="./logo.png" alt="" width="60" height="60"/>
                <h2 className="text-2xl font-bold text-red-700 flex gap-2">PQuiz</h2>
              </a>
            </div>
      
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
      
              <button
                className="block rounded-lg bg-red-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
                onClick={() => {
                  changeTheLoginState();
                }}
              >
                {user.isLogged? 'logout' : 'login'}

              </button>
            </div>
          </div>
      </nav>
    );
}

export default Navbar;