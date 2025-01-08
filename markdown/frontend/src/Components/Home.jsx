import React from "react";
import { NavLink } from "react-router";
import example1 from "../assets/Example1.png";
import mongodblogo from "../assets/mongodblogo.png";
import nodejslogo from "../assets/nodejslogo.png";
import expresslogo from "../assets/expresslogo.png";
import reactlogo from "../assets/reactlogo.png";
import githublogo from "../assets/githublogo.png"

function Home() {
  return (
    <div className="font-sans bg-gradient-to-r from-violet-900 to-slate-950">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-950 to-slate-950 
      text-slate-200 sticky top-0 z-50 border-b border-slate-700">
        <div className="text-2xl font-bold">
          <h1>Markdown Notes</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#tech-stack" className="hover:text-purple-400">
                Tech Stack
              </a>
            </li>
            <li>
              <a href="#dependencies" className="hover:text-purple-400">
                Dependencies
              </a>
            </li>
            <li>
              <a href="#github" className="hover:text-purple-400">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="flex items-center justify-center bg-gradient-to-r from-violet-950 to-slate-950 text-slate-200 h-96">
        <div className="text-center">
          <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-tight text-slate-200">
            Simple Markdown Note Taking App created using <span className="text-purple-300"> MERN Stack</span>
          </h2>
            <NavLink to="/markdown"
            className="bg-violet-800 hover:bg-violet-400 text-slate-200 hover:text-slate-950 px-6 py-3
          rounded-full text-xl transition" 
          end
          >
            Start Writing
          </NavLink>
          
        </div>
      </section>

      <section
        className="py-20 px-5 flex flex-col lg:flex-row justify-between 
      items-center bg-gradient-to-r from-violet-900 to-slate-950"
      >
        <div className="w-full lg:w-1/3 mb-10 lg:mb-0">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-200">
            Clean and Simple
            <span className="text-purple-300"> UI</span>
          </h1>
          <p className="text-lg font-normal text-slate-400">
            Simple markdown note-taking for your everyday notes.
          </p>
        </div>
        <div className="w-full lg:w-2/3 border border-slate-500 rounded-2xl">
          <img
            className="w-full h-auto border-8 border-slate-950 rounded-2xl"
            src={example1}
            alt="Example"
          />
        </div>
      </section>

      {/*Tech Stack Section */}
      <section id="tech-stack" className="py-20 bg-gradient-to-r from-violet-950 to-slate-950 text-slate-200">
        <h2 className="text-3xl font-semibold mb-10 text-center">Tech Stack</h2>
        <ul className="flex flex-wrap justify-center gap-12">
          {/* MongoDB */}
          <li className="bg-violet-900 text-slate-200 py-6 px-10 rounded-2xl flex 
          items-center gap-6 transition-all transform hover:scale-110 hover:bg-violet-700 shadow-lg hover:shadow-xl">
            <img
              src={mongodblogo}
              alt="MongoDB"
              className="w-16 h-16 object-contain" 
            />
            <span className="text-xl font-semibold">MongoDB</span>
          </li>

          {/* Express.js */}
          <li className="bg-violet-900 text-slate-200 py-6 px-10 rounded-2xl flex 
          items-center gap-6 transition-all transform hover:scale-110 hover:bg-violet-700 shadow-lg hover:shadow-xl">
            <img
              src={expresslogo}
              alt="Express.js"
              className="w-16 h-16 object-contain" 
            />
            <span className="text-xl font-semibold">Express.js</span>
          </li>

          {/* React.js */}
          <li className="bg-violet-900 text-slate-200 py-6 px-10 rounded-2xl flex 
          items-center gap-6 transition-all transform hover:scale-110 hover:bg-violet-700 shadow-lg hover:shadow-xl">
            <img
              src={reactlogo}
              alt="React.js"
              className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-semibold">React.js</span>
          </li>

          {/* Node.js */}
          <li className="bg-violet-900 text-slate-200 py-6 px-10 rounded-2xl flex 
          items-center gap-6 transition-all transform hover:scale-110 hover:bg-violet-700 shadow-lg hover:shadow-xl">
            <img
              src={nodejslogo}
              alt="Node.js"
              className="w-16 h-16 object-contain" 
            />
            <span className="text-xl font-semibold">Node.js</span>
          </li>
        </ul>
      </section>

      {/*Dependencies Section */}
      <section id="dependencies" className="py-20 bg-transparent text-slate-200">
        <h2 className="text-3xl font-semibold mb-6 text-center">Dependencies</h2>
        <p className="text-lg text-center mb-8">
          This project depends on several libraries to enhance functionality and performance.
        </p>
        
        <ul className="flex flex-wrap justify-center gap-6">
          {/* React MD Editor */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">React MD Editor</span>
  <p className="text-sm">
    A simple, lightweight Markdown editor built with React. Ideal for quick integration.
  </p>
  <a href="https://www.npmjs.com/package/@uiw/react-md-editor" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on npm
  </a>
</li>

{/* @szhsin/react-menu */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">@szhsin/react-menu</span>
  <p className="text-sm ">
    A highly customizable dropdown menu library for React. Great for building dynamic menus.
  </p>
  <a href="https://www.npmjs.com/package/@szhsin/react-menu" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on npm
  </a>
</li>

{/* React Toastify */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">React Toastify</span>
  <p className="text-sm">
    A library for adding notifications to React apps with easy-to-use and customizable toasts.
  </p>
  <a href="https://www.npmjs.com/package/react-toastify" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on npm
  </a>
</li>

{/* Axios */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">Axios</span>
  <p className="text-sm">
    A promise-based HTTP client for the browser and Node.js, perfect for making requests to external APIs.
  </p>
  <a href="https://axios-http.com/" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on Axios
  </a>
</li>

{/* Word Count */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">Word Count</span>
  <p className="text-sm">
    A lightweight library to easily count the number of words, characters, and more in text.
  </p>
  <a href="https://www.npmjs.com/package/word-count" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on npm
  </a>
</li>

{/* Tailwind CSS */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">Tailwind CSS</span>
  <p className="text-sm ">
    A utility-first CSS framework for rapidly building custom user interfaces.
  </p>
  <a href="https://tailwindcss.com/" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on Tailwind CSS
  </a>
</li>

{/* React Router */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col 
items-center text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">React Router</span>
  <p className="text-sm">
    A declarative routing library for React, enabling navigation and page management.
  </p>
  <a href="https://reactrouter.com/" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on React Router
  </a>
</li>

{/* CORS */}
<li className="bg-violet-900 text-slate-200 py-4 px-6 rounded-lg flex flex-col items-center 
text-center transition-all transform hover:scale-105 hover:bg-purple-500 shadow-lg hover:shadow-xl hover:text-black">
  <span className="text-xl font-semibold">CORS</span>
  <p className="text-sm ">
    A package for handling Cross-Origin Resource Sharing, essential for APIs.
  </p>
  <a href="https://www.npmjs.com/package/cors" className="text-purple-300 hover:text-slate-800 text-xs">
    Learn more on npm
  </a>
</li>

        </ul>
      </section>

      {/* Footer */}
      <footer id="github" className="bg-slate-900 text-slate-200 py-4 border-t border-slate-700 flex justify-center align-middle">
        <a href="">
          <img src={githublogo} alt="Github Repository" title="Github Repository"
          className="h-12" />
        </a>
      </footer>
    </div>
  );
}

export default Home;
