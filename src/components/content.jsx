import React from 'react';
import { LuLinkedin, LuMail, LuPhone } from "react-icons/lu";
import Resume from './resume';
import Frontpageanimation from './frontpageanimation';
import Github from "./github";
import { profile } from '../data/profile';


const content = () => {
  return (
    <div className='md:w-full flex justify-between bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-[white] md:mt-0 mt-6'>
    <div className='min-h-screen md:px-36 md:py-16 md:pb-4 px-8 py-12 bg-[white] select-none md:w-6/12 md:pr-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
      <div className='text-center'>
        {/* <h1 className='text-left md:px-2 md:pb-2 px-3 font-normal text-2xl font-poppins text-black'>My Name is</h1> */}
        <br />
        <h1 className='text-left font-medium text-7xl md:text-8xl font-rubix bg-gradient-to-r from-[#833be7cb] to-[#5521c5] bg-clip-text text-transparent'>{profile.firstName}</h1>
        <h1 className='text-left md:pb-6 pt-2 md:pt-0 pb-7 leading-10 font-semibold text-6xl md:text-7xl font-rubix'>{profile.lastName}</h1>
        <hr className='md:w-24 w-20 md:mb-0 mb-4 h-3 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]'></hr>
      </div>
      <div className='text-[rgb(15,23,42)] text-center'>
         <h1 className='text-left md:pt-8 text-2xl font-poppins font-normal'>I build scalable
            <span className='text-left md:pt-8 text-3xl font-semibold font-rubix'> {profile.role}<br></br>solutions</span>
         </h1>
         <p className='text-left font-poppins text-base text-slate-700 md:pt-6'>
          Focused on web applications, AWS infrastructure, AI-based systems, and custom WordPress implementations.
         </p>
         <p className='text-left font-poppins text-sm text-slate-500 md:pt-3'>
          {profile.baseLocation} · {profile.relocation}
         </p>
      </div>
      <div className="flex md:p-6 pt-4 space-x-2.5 w-full md:pt-8 md:pb-8">
        <a className='pl-2 h-10 w-10 text-center border pt-2 rounded-md border-black hover:bg-[#c580f023] transition-all duration-500 active:bg-zinc-300' href={profile.linkedin} target="_blank" rel="noreferrer">
          <LuLinkedin size={23} />
        </a>
        <a className='pl-2 h-10 w-10 text-center border pt-2 rounded-md border-black hover:bg-[#c580f023] transition-all duration-500 active:bg-zinc-300' href={`mailto:${profile.email}`}>
          <LuMail size={23} />
        </a>
        <a className='pl-2 h-10 w-10 text-center border pt-2 rounded-md border-black hover:bg-[#c580f023] transition-all duration-500 active:bg-zinc-300' href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
          <LuPhone size={23} />
        </a>
      </div>
      <div>
        <Resume/>
      </div>
    </div>
      <div className='hidden lg:inline-block md:h-fit md:w-5/12 relative md:mr-32 md:mt-16'>
        <Frontpageanimation/>
      </div>  
      <Github />
    </div>
    )
}

export default content;
