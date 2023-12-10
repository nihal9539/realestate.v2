import React from 'react'
import './Residancies.css'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import "swiper/css"
import { SliderSettings } from "../../utils/common"
import PropertyCard from '../PropertyCard/PropertyCard'
import useProperties from '../../hooks/useProperties'
import { PuffLoader } from 'react-spinners'

const Residancies = () => {
    const {data,isError,isLoading} = useProperties();
    if (isError) {
        return (
          <div className='wrapper'>
            <span>Error While fetching data</span>
          </div>
        )
      }
      if (isLoading) {
        return(
          <div className="wrapper flexCenter" style={{height:"60vh"}}>
          <PuffLoader
           height="80"
           width="80"
           radius={1}
           color='#4066ff'
           aria-label='puff-loading'
          />
        </div>
        )
      };
    return (
        <section className="r-wrapper">
            <div className="paddings innerWidth r-container">
                <div className="r-head flexColStart">
                    <span className='orangeText'>Best choices</span>
                    <span className='primaryText'>Popular Residancies</span>
                </div>
                <Swiper {...SliderSettings}>
                    <SliderButtons />
                    {
                        data.slice(0,8).map((card, index) => (
                            <SwiperSlide key={index} >
                                <PropertyCard card={card} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Residancies
const SliderButtons = () => {
    const swiper = useSwiper();
    return (
        <div className="flexCenter r-buttons">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    )
}