import React from 'react'
import Hero from '../components/Hero/Hero'
import Companies from '../components/Companies/Companies'
import Residancies from '../components/Residancies/Residancies'
import Value from '../components/Value/Value'
import Contact from '../components/Contact/Contact'
import GetStart from '../components/GetStart/GetStart'


const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
     
      <Hero />
    </div>
    <Companies/>
    <Residancies/>
    <Value/>
    <Contact/>
    <GetStart/>
  
  </div>
  )
}

export default Website