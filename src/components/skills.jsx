import React from 'react';
import { LuLightbulb } from "react-icons/lu";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';   
import Animation from './lottiefiles/skills.lottie'; 
import { skillGroups } from '../data/profile';

const skills = () => {
  const iconMap = {
    "PHP": "php",
    "Node.js": "nodejs",
    "C#": "dotnet",
    "Java": "java",
    "WordPress": "wordpress",
    "AWS": "aws",
    "PostgreSQL": "postgres",
    "Git": "git",
  };

  return (
    <div className='md:p-22 md:pt-24 p-8 flex justify-between md:pb-22 md:px-40 md:h-full select-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-[white] md:mt-0 mt-6 pt-16'>
        <div className=''>
            <div className='md:w-6/12'>
                <div className='md:w-28 md:h-7 rounded-full w-20 h-5 bg-black md:px-1 space-x-3.5 mb-6'>
                    <LuLightbulb className='md:inline-block text-white font-semibold relative md:left-1.5 hidden scale-50 md:scale-100 md:-top-px' size={22}/>
                    <span className='text-white font-poppins text-xs md:text-xs font-normal md:font-medium relative md:-left-0 -left-0 md:-top-0 -top-1 md:pb-0'>My Skills</span>
                </div>
            </div>
            <div>
                <h1 className='font-poppins text-4xl font-medium'>My <span className='bg-gradient-to-r from-[#833be7cb] to-[#5521c5] bg-clip-text text-transparent'>Technical</span><br className='md:block hidden'/> Profile</h1>
                <hr className='md:w-44 w-32 md:mb-0 mb-4 h-3 mt-3 md:ml-0 lg:mt-4 bg-gradient-to-r from-[#bf77eced] to-[#c580f0c8]'></hr>
            </div>
            <div>
                {skillGroups.map((group, index) => (
                    <div key={group.title} className={index === 0 ? 'md:w-full md:mt-10' : 'md:mt-6 mt-4'}>
                        <h1 className='md:font-semibold font-bold md:text-2xl md:inline-block md:mr-5 md:mb-0 mb-2'>{group.title}</h1>
                        <div className='md:mt-2 font-poppins text-slate-700'>
                            <p>{group.items.join(', ')}</p>
                        </div>
                        <div className='mt-3 flex flex-wrap gap-2'>
                            {group.items
                              .filter((item) => iconMap[item])
                              .map((item) => (
                                <img
                                  key={item}
                                  src={`https://skillicons.dev/icons?i=${iconMap[item]}`}
                                  alt={item}
                                  style={{ width: 42, height: 42 }}
                                />
                              ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='hidden lg:block'>
            <DotLottiePlayer
                src={Animation}
                autoplay
                loop
            >
            </DotLottiePlayer>
        </div>
    </div>
    )
}
export default skills;
