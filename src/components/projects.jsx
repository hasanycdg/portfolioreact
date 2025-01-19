import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import Animation from './lottiefiles/skills.lottie';

const skills = () => {
  const projects = [
    {
      title: "Connect Four AI",
      description: "An AI-powered Connect Four game using Python with minimax algorithm for decision-making.",
      technologies: ["Python", "Flask", "AWS Lambda"],
    },
    {
        title: "IoT Edge Cloud: Real-Time Processing for Smart Devices",
        description: "Integrates IoT devices with edge computing and cloud platforms to enable real-time data processing and decision-making",
        technologies: ["Python", "AWS", "MQTT"],
        link: "https://github.com/hasanycdg/verteiltesysteme"
        },
    {
      title: "Historical Event Timeline",
      description: "A web app that visualizes historical events and news data using Flask and Plotly.",
      technologies: ["Python", "Flask", "Plotly", "React"],
      link: "https://git.uibk.ac.at/csba4787/bachelor-project"
    },
    {
        title: "Weather Applicatin",
        description: "A web app that visualizes real time weather data",
        technologies: ["Java", "SpringBoot", "PostgreSQL", "API","HTML","CSS"],
        link: "https://github.com/hasanycdg/github_projekt"
    },
    {
      title: "Fraud Detection",
      description: "Detecting frauds in the transaction dataset with ML models and visualizing the results.",
      technologies: ["Python", "Jupyter", "RandomForest", "Neural Network"],
      link: "https://github.com/luprader/PS_ML_group_project"
    }
  ];

  return (
    <div className='md:p-22 md:pt-24 p-8 flex flex-col md:pb-22 md:px-40 md:h-full select-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-[white] md:mt-0 mt-6 pt-16'>


      {/* Projects Section */}
      <div className='mt-16'>
        <h2 className='font-poppins text-4xl font-medium'>
          My <span className='bg-gradient-to-r from-[#833be7cb] to-[#5521c5] bg-clip-text text-transparent'>Projects</span>
        </h2>
        <hr className='md:w-44 w-32 md:mb-0 mb-4 h-3 mt-3 md:ml-0 lg:mt-4 bg-gradient-to-r from-[#bf77eced] to-[#c580f0c8]'></hr>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {projects.map((project, index) => (
            <div key={index} className='border rounded-lg p-4 shadow-md bg-white'>
              <h3 className='font-bold text-xl'>{project.title}</h3>
              <p className='text-sm text-gray-600 mt-2'>{project.description}</p>
              <p className='text-sm mt-2'>
                <span className='font-bold'>Technologies:</span> {project.technologies.join(", ")}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className='text-blue-500 underline mt-4 inline-block'
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default skills;
