import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import './pages/Home.css';
import Features from './components/Features';
import './components/Navbar.css';
import "./App.css";
function App() {
 

  return (
    <>
      <Navbar/>
      <Home/>
      <Features/>
    </>
  )
}

export default App
