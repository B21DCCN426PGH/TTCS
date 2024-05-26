import React from "react";
import Image from "next/image";

function QuizBuildNav(){
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