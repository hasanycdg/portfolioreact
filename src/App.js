import React from "react";
import Content from "./components/content";
import Frontpageanimation from "./components/frontpageanimation";
import Navbar from "./components/navbar";
import { BrowserRouter, Route,Link,Routes } from 'react-router-dom'
import About from "./components/about";
import Skills from "./components/skills"
import Contact from "./components/contact";
import Projects from "./components/projects";

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
