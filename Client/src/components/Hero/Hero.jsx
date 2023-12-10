import React from 'react'
import "./Hero.css"
import CountUp from "react-countup"
import { easeIn, motion } from "framer-motion"
import Searchbar from '../SearchBar/Searchbar'

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">

        {/* Left side */}
        
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: easeIn
              }}
            >

              Discover <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>

          <div className="flexColStart hero-des">
            <span className='secondaryText'>
              Find a veryety of preperation that suit you very easily
            </span>
            <span className='secondaryText'>
              forgot all difficulties in finding a residence for you
            </span>
          </div>
         <Searchbar/>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} />
                <span>+</span>
              </span>
              <span className='secondaryText'>Perminum Product</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp start={1900} end={200} duration={4} />
                <span>+</span>
              </span>
              <span className='secondaryText'>Happy Customer</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={20} />
                <span>+</span>
              </span>
              <span className='secondaryText'>Award winning</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration:2,
              type:"spring"
            }}
            className="image-container"
          >
            <img src="./hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero