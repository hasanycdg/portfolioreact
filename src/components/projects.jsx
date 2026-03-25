import React from 'react';

const skills = () => {
  const projects = [
    {
      title: "Transly",
      description: "A SaaS translation platform for translating large volumes of content, including XLIFF files and structured localization data. The product is still in production development and is designed for efficient translation workflows at scale.",
      technologies: ["SaaS", "Translation", "XLIFF", "Localization", "Production"],
      link: "https://github.com/hasanycdg/transly",
      ctaLabel: "View on GitHub",
    },
    {
      title: "RAG Chatbot for WordPress",
      description: "A RAG chatbot delivered as a WordPress plugin and also embeddable via iframe for other websites. It is currently used on the Moar Gut Hotel website and is being tested by four additional clients, with very positive feedback so far.",
      technologies: ["RAG", "WordPress Plugin", "AI Chatbot", "Iframe", "Production"],
      link: "https://github.com/florianmatthiashasan/rag-chatbot",
      ctaLabel: "View Project",
    },
    {
      title: "Agency Block CLI",
      description: "A Node.js CLI for web agencies that pulls reusable WordPress components, meta boxes, and assets from a private monorepo into the currently open theme. It is used in our agency workflow and significantly reduces setup and implementation time across similar client repositories.",
      technologies: ["Node.js", "CLI", "WordPress", "Monorepo", "Agency Workflow"],
      link: "https://github.com/florianmatthiashasan/agency-block",
      ctaLabel: "View Project",
    },
    {
      title: "Codebase Complexity Visualizer (CCV)",
      description: "An open-source, local-first macOS desktop app for understanding repository structure, hotspot risk, and dependency cycles. It helps developers inspect large codebases, identify risky files, and analyze architectural bottlenecks without sending code to the cloud.",
      technologies: ["macOS", "Rust", "Tauri", "TypeScript", "SQLite", "Open Source"],
      link: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
      ctaLabel: "View on GitHub",
    },
    {
        title: "IoT Edge Cloud: Real-Time Processing for Smart Devices",
        description: "A school project focused on integrating IoT devices with edge computing and cloud platforms to enable real-time data processing and decision-making.",
        technologies: ["Python", "AWS", "MQTT"],
        },
    {
      title: "Historical Event Timeline",
      description: "A school project that visualizes historical events and news data in an interactive web application built with Flask, Plotly, and React.",
      technologies: ["Python", "Flask", "Plotly", "React"],
    },
    {
        title: "Weather Application",
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

  const papers = [
    {
      title: "Guess the Age of Photos",
      description: "I designed and coded this interactive web platform for historical image age estimation as part of my bachelor thesis, which was graded 1.0. The work later became a research paper co-authored with my professor and submitted to CIKM, and it led to an invitation to Seoul, South Korea.",
      technologies: ["Python", "Flask", "Bootstrap", "PostgreSQL", "Research"],
      link: "https://www.researchgate.net/publication/392167840_Guess_the_Age_of_Photos_An_Interactive_Web_Platform_for_Historical_Image_Age_Estimation",
      ctaLabel: "Read Paper",
    },
    {
      title: "IoT für autonome Fahrzeuge",
      description: "Seminar paper on the application of the Internet of Things in vehicle communication and the role of intelligent infrastructures for autonomous vehicles. Written at the University of Innsbruck in the SE Vertiefungsseminar under the supervision of Prof. Dr. Thomas Fahringer.",
      technologies: ["IoT", "Connected Vehicles", "Smart Infrastructure", "Research", "Seminar Paper"],
      link: "/Semesterarbeit.pdf",
      ctaLabel: "Read Paper",
    },
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
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-blue-500 underline mt-4 inline-block'
                >
                  {project.ctaLabel || "View Project"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-16'>
        <h2 className='font-poppins text-4xl font-medium'>
          My <span className='bg-gradient-to-r from-[#833be7cb] to-[#5521c5] bg-clip-text text-transparent'>Papers</span>
        </h2>
        <hr className='md:w-44 w-32 md:mb-0 mb-4 h-3 mt-3 md:ml-0 lg:mt-4 bg-gradient-to-r from-[#bf77eced] to-[#c580f0c8]'></hr>
        <div className='grid md:grid-cols-2 gap-6 mt-6'>
          {papers.map((paper, index) => (
            <div key={index} className='border rounded-lg p-4 shadow-md bg-white'>
              <h3 className='font-bold text-xl'>{paper.title}</h3>
              <p className='text-sm text-gray-600 mt-2'>{paper.description}</p>
              <p className='text-sm mt-2'>
                <span className='font-bold'>Topics:</span> {paper.technologies.join(", ")}
              </p>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-blue-500 underline mt-4 inline-block'
                >
                  {paper.ctaLabel || "Read Paper"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default skills;
