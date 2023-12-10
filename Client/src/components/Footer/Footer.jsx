import React from 'react'
import "./Footer.css"
const Footer = () => {
    return (
        <div className="f-wrapper">

            <div className="paddings innerWidth flexCenter f-container">
                {/* Left side */}
                <div className="flexColStart f-left">
                    <img src="./logo2.png" alt="" width={120} />
                    <div className="secondaryText">
                        Our vision to make all people <br />
                        the best place to live for them
                    </div>
                </div>
                {/* Right side */}
                <div className="f-right flexColStart">
                    <span className='primaryText'>information</span>
                    <span className='secondaryText'>Kerala,India</span>
                    <div className="flexCenter f-menu">
                        <span>Property</span>
                        <span>Services</span>
                        <span>Product</span>
                        <span>About Us</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer