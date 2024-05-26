import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function QuizBuildTitle(props){
    return(
        <div className="p-3 flex justify-between border border-red-700 rounded-md">
            <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                    <div className="bg-red-700 px-4 py-1 rounded text-white">1</div>
                    <span className="font-bold"> Quiz Name:</span>
                </div>
                <input type="text" className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
                placeholder="Enter Quiz Name..." />

            </div>
            <FontAwesomeIcon icon = {faCode} height={40} width={40}
            className="text-white p-2 rounded-md bg-red-700 cursor-pointer"/>

        </div>
    );
}
export default QuizBuildTitle;