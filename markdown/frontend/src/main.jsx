import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router"
import './index.css'
import App from './App.jsx'
import Home from './Components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/markdown" element={<App/>} />
    </Routes>
  </BrowserRouter>
)
