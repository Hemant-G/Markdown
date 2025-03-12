import React from "react";
import { NavLink } from "react-router";
import example1 from "../assets/Example1.png";
import mongodblogo from "../assets/mongodblogo.png";
import nodejslogo from "../assets/nodejslogo.png";
import expresslogo from "../assets/expresslogo.png";
import reactlogo from "../assets/reactlogo.png";
import githublogo from "../assets/githublogo.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return (
    <div className="font-sans bg-gradient-to-r from-slate-950 to-violet-950 from-70%">
      {/* Header */}
      <header
        className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-slate-950 to-violet-950 from-70%
      text-slate-200 sticky top-0 z-50 border-b border-slate-700"
      >
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

      <section className="flex items-center justify-center bg-gradient-to-r from-slate-950 to-violet-950 from-70% text-slate-200 h-96">
        <div className="text-center">
          <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-tight text-slate-200">
            Simple Markdown Note Taking App created using{" "}
            <span className="text-purple-300"> MERN Stack</span>
          </h2>
          <div>
            <LoginButton />
          </div>
        </div>
      </section>

      <section
        className="py-20 px-5 flex flex-col lg:flex-row justify-between 
      items-center bg-transparent"
      >
        <div className="w-full lg:w-1/3 mb-10 lg:mb-0">
          <h1 className="mb-4 text-7xl font-extrabold leading-none tracking-tight text-slate-100">
            Clean and Simple
            <span className="text-purple-300"> UI</span>
          </h1>
          <p className="text-lg font-normal text-slate-400">
            Simple markdown note-taking for your everyday notes.
          </p>
        </div>
        <div className="w-full lg:w-2/3 border border-slate-500 rounded-2xl z-10 ">
          <img
            className="w-full h-auto border-8 border-slate-950 rounded-2xl"
            src={example1}
            alt="Example"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech-stack"
        className="py-20 bg-gradient-to-r from-slate-950 to-violet-950 from-70% text-slate-200"
      >
        <h2 className="mb-4 text-6xl font-extrabold leading-none text-center tracking-tight text-slate-200">Tech Stack</h2>
        <ul className="flex flex-wrap justify-center gap-12">
          {[
            {
              name: "MongoDB",
              logo: mongodblogo,
              link: "https://www.mongodb.com/",
            },
            {
              name: "Express.js",
              logo: expresslogo,
              link: "https://expressjs.com/",
            },
            { name: "React.js", logo: reactlogo, link: "https://react.dev/" },
            { name: "Node.js", logo: nodejslogo, link: "https://nodejs.org/" },
          ].map((tech) => (
            <li
              key={tech.name}
              className="bg-slate-800 text-slate-200 py-6 px-10 rounded-2xl flex items-center gap-6 
              transition-all transform hover:scale-110 hover:border hover:border-violet-300 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => window.open(tech.link, "_blank")}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-16 h-16 object-contain"
              />
              <span className="text-xl font-semibold">{tech.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Dependencies Section */}
      <section
        id="dependencies"
        className="py-20 bg-transparent text-slate-200"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Dependencies
        </h2>
        <p className="text-lg text-center mb-8">
          This project depends on several libraries to enhance functionality and
          performance.
        </p>

        <ul className="flex flex-wrap justify-center gap-6">
          {[
            {
              name: "React MD Editor",
              description:
                "A simple, lightweight Markdown editor built with React. Ideal for quick integration.",
              link: "https://www.npmjs.com/package/@uiw/react-md-editor",
            },
            {
              name: "@szhsin/react-menu",
              description:
                "A highly customizable dropdown menu library for React. Great for building dynamic menus.",
              link: "https://www.npmjs.com/package/@szhsin/react-menu",
            },
            {
              name: "React Toastify",
              description:
                "A library for adding notifications to React apps with easy-to-use and customizable toasts.",
              link: "https://www.npmjs.com/package/react-toastify",
            },
            {
              name: "Axios",
              description:
                "A promise-based HTTP client for the browser and Node.js, perfect for making requests to external APIs.",
              link: "https://axios-http.com/",
            },
            {
              name: "Word Count",
              description:
                "A lightweight library to easily count the number of words, characters, and more in text.",
              link: "https://www.npmjs.com/package/word-count",
            },
            {
              name: "Tailwind CSS",
              description:
                "A utility-first CSS framework for rapidly building custom user interfaces.",
              link: "https://tailwindcss.com/",
            },
            {
              name: "React Router",
              description:
                "A declarative routing library for React, enabling navigation and page management.",
              link: "https://reactrouter.com/",
            },
            {
              name: "CORS",
              description:
                "A package for handling Cross-Origin Resource Sharing, essential for APIs.",
              link: "https://www.npmjs.com/package/cors",
            },
          ].map((dependency) => (
            <li
              key={dependency.name}
              className="backdrop-blur-xs  text-slate-200 py-4 px-6 rounded-lg flex flex-col items-center text-center 
              transition-all transform hover:scale-105 hover:border hover:border-violet-300 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => window.open(dependency.link, "_blank")}
            >
              <span className="text-xl font-semibold">{dependency.name}</span>
              <p className="text-sm">{dependency.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer
        id="github"
        className="backdrop-blur-xs text-slate-200 py-4 border-t border-slate-700 flex justify-center align-middle"
      >
        <a href="https://github.com/Hemant-G/Markdown" className="transition hover:scale-110">
          <img
            src={githublogo}
            alt="Github Repository"
            title="Github Repository"
            className="h-12"
          />
        </a>
      </footer>
    </div>
  );
}

export default Home;
