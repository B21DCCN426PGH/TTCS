import React from "react";
import Image from "next/image";

function PlaceHolder(props){
    return (
        <div className="poppins flex-col flex gap-3 p-4 items-center justify-center">
            <image src="./logo.png" alt=" " width={130} height={130}/>
            <h2 className="text-2xl font-bold">Quizzes await!Make a quiz.</h2>
            <span className="text-[13px] font-light">
                Click below to begin your journey here ...
            </span>
            <button className="p-3 px-4 text-white text-[13px] bg-red-700 rounded-md">
                Create first Quiz
            </button>
        </div>
    );
}
export default PlaceHolder