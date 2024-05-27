'use client';
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconsData } from '@/app/iconsData';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useGlobalContextProvider from "@/app/ContextApi";

function IconsComponents(){
    const {allIcons, setAllIcons} = useState(iconsData);
    const {openBoxToggle,selectedIconObject} = useGlobalContextProvider();
    const {openIconBox, setOpenIconBox} = openBoxToggle;
    const {setSelectedIcon} = selectedIconObject;

    function handleClickedIcon(iconIndex){
        const updatedIcons = allIcons.map((icon,i)=>{
                if(i === iconIndex){
                    setSelectedIcon((prevState) =>{
                        const copyIconState = prevState;
                        copyIconState.faIcon = icon.faIcon;
                        return copyIconState;
                    });
                    return {...icon, isSelected: true};
                }

                return {...icon, isSelected: false};
        });

        setAllIcons(updatedIcons);
    }

    return (
        <div className={` w-full flex absolute justif-center items-center top-50 ${
            openIconBox ? 'visible' : 'invisible' }`}>
                <div className="relative z-50 w-[570px] p-4 rounded-md bg-white
                border borede-red-700 flex flex-col gap-6 shadow-md">
                    <FontAwesomeIcon
                        icon={faClose}
                        height={20}
                        width={20}
                        className="absolute right-4 top-8 cursor-pointer text-gray-300"
                        onClick={() => {
                            setOpenIconBox(false);
                        }}
                    />
                    <span className="font-bold text-lg text-red-700 bg-white mt-3">
                        Choose your Icon
                    </span>

                    <div className="border border-gray-200 p-5 flex flex-wrap gap-4 items-center rounded-md">
                        {allIcons.map((icon, iconIndex) => (
                            <FontAwesomeIcon
                                key={iconIndex} className={`
                                border p-2 border-gray-300 rounded-md text-xl cursor-pointer
                                hover:text-red-700  hover:border-red-700 ${
                                    icon.isSelected ? 'text-red-700 border-red-700' : 'text-black border-gray-300'
                                }`}
                                height={50}
                                width={50}
                                icon={icon.faIcon}
                                onClick={() =>{
                                    handleClickedIcon(iconIndex);
                                } }
                            />
                        ))}
                    </div>
                    <div className="flex my-2 justify-end">
                        <button
                            onClick={()=>{
                                setOpenIconBox(false);
                            }}
                            className="bg-red-700 hover:bg-green-800 text-white px-4 p-2 rounded-md">Save</button>
                    </div>
                </div>
        </div>
    );
}
export default IconsComponents ;
