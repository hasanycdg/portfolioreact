import React from 'react';
import { LuUser } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { education, experience, focusAreas, languages, profile } from '../data/profile';

const About = () => {
  return (
    <div className='md:p-22 md:pt-24 md:pb-22 md:px-40 md:h-full select-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-[white] p-8 md:flex justify-normal space-x-28 md:mt-0 mt-6 pt-16'>
      
      {/* Left: Main Info */}
      <div className='md:w-6/12'>
        <div className='md:w-28 md:h-7 rounded-full w-20 h-5 bg-black md:px-1 space-x-3.5 mb-6'>
          <LuUser className='md:inline-block text-white font-semibold relative md:left-1.5 hidden scale-50 md:scale-100' size={22} />
          <span className='text-white font-poppins text-xs md:text-xs font-normal md:font-medium relative md:-left-0 -left-1 md:-top-0 -top-1 md:pb-0 pb-2 md:pt-0'>About me</span>
        </div>

        <div className='md:pt-5'>
          <h1 className='md:text-5xl text-4xl md:font-medium font-semibold'>
            {profile.role}{' '}
            <br className='md:hidden' />
            <span className='bg-gradient-to-r from-[#833be7cb] to-[#5521c5] bg-clip-text text-transparent'>
              AWS & AI focus{' '}
            </span>
            <br />
            <span className='md:text-4xl text-3xl font-poppins font-normal md:font-medium'>
              Based in Austria.
            </span>
          </h1>
          <hr className='md:w-44 w-32 md:mb-0 mb-4 h-3 mt-3 md:ml-0 lg:mt-4 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
        </div>

        <div className='md:w-12/12 md:mt-10'>
          <p className='font-poppins text-justify'>
            {profile.summary}
          </p>
        </div>

        {/* Skills highlights */}
        <div className='md:mt-10 mt-8'>
          <h2 className='text-2xl font-poppins font-medium'>Core focus</h2>
          <hr className='w-40 h-1 mt-2 mb-4 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
          <div className='font-poppins space-y-1 text-sm text-gray-700'>
            {focusAreas.map((area) => (
              <p key={area}><GoDot className='inline' /><span className='pl-2'>{area}</span></p>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Personal Info */}
      <div className='relative md:-left-0 -left-28 md:pt-4 pt-12'>

        <div className='md:w-96'>
          <h2 className='text-3xl font-poppins font-medium md:ml-10'>Languages</h2>
          <hr className='md:w-64 w-32 md:mb-0 mb-2 md:h-1 h-1 mt-3 md:ml-10 lg:mt-1 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
          {languages.map((language, index) => (
            <p key={language.name} className={`${index === 0 ? 'md:mt-5 mt-3' : 'md:mt-2'} md:ml-2 font-poppins`}>
              <GoDot className='inline' />
              <span className='md:pl-12 text-xl pl-4'>
                {language.name} <span className='text-sm text-gray-500'>({language.level})</span>
              </span>
            </p>
          ))}
        </div>

        <div className='md:mt-6 mt-5'>
          <h2 className='text-3xl font-poppins font-medium md:ml-10 md:mt-0 mt-5'>Location</h2>
          <hr className='md:w-64 w-32 md:mb-0 mb-4 md:h-1 h-1 mt-3 md:ml-10 lg:mt-1 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
          <p className='md:mt-4 md:ml-2 font-poppins'><GoDot className='inline' /><span className='md:pl-12 text-xl pl-4'>{profile.baseLocation}</span></p>
          <p className='md:mt-2 md:ml-2 font-poppins'><GoDot className='inline' /><span className='md:pl-12 text-base pl-4 text-gray-500'>{profile.relocation}</span></p>
        </div>

        <div className='md:mt-6 mt-5'>
          <h2 className='text-3xl font-poppins font-medium md:ml-10 md:mt-0 mt-5'>Experience</h2>
          <hr className='md:w-64 w-32 md:mb-0 mb-4 md:h-1 h-1 mt-3 md:ml-10 lg:mt-1 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
          {experience.map((item, index) => (
            <p key={item.company} className={`${index === 0 ? 'md:mt-4' : 'md:mt-2'} md:ml-2 font-poppins`}>
              <GoDot className='inline' />
              <span className='md:pl-12 text-base pl-4'>
                {item.role}, {item.company} <span className='text-sm text-gray-500'>({item.period})</span>
              </span>
            </p>
          ))}
        </div>

        <div className='md:mt-6 mt-5'>
          <h2 className='text-3xl font-poppins font-medium md:ml-10 md:mt-0 mt-5'>Education</h2>
          <hr className='md:w-64 w-32 md:mb-0 mb-4 md:h-1 h-1 mt-3 md:ml-10 lg:mt-1 bg-gradient-to-r from-[#c580f0ed] to-[#c580f0c8]' />
          {education.map((item, index) => (
            <p key={item.school} className={`${index === 0 ? 'md:mt-4' : 'md:mt-2'} md:ml-2 font-poppins`}>
              <GoDot className='inline' />
              <span className='md:pl-12 text-base pl-4'>
                {item.degree}, {item.school} <span className='text-sm text-gray-500'>({item.period})</span>
              </span>
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
