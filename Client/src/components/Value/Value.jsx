import React, { useState } from 'react'
import './Value.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion'
import "react-accessible-accordion/dist/fancy-example.css"
import { MdOutlineArrowDropDown } from 'react-icons/md'
import data from "../../utils/accordion"

const Value = () => {
    return (
        <div className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                {/* Left side */}
                <div className="v-left">
                    <div className="image-container">
                        <img src="./value.png" alt="" />
                    </div>
                </div>
                {/* Right side */}
                <div className="v-right flexColStart ">
                    <span className='orangeText'>Our Value</span>
                    <span className='primaryText'>Value we givw to you</span>
                    <span className='secondaryText'>we are always readt to help by providing the best service for you
                        <br />
                        We bwlive a good place to live can make you better
                    </span>
                    <Accordion
                        className='accordian'
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >
                        {
                            data.map((item, index) => {
                                const [className,setClassName] = useState(null)
                                return (
                                    <AccordionItem className={`accordianitem ${className}`} key={index} uuid={index}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='flexCenter accordianbutton'>
                                                <AccordionItemState>
                                                    {({expanded}) =>
                                                        expanded
                                                            ? setClassName("expanded")
                                                            : setClassName("collapse") 
                                                    }
                                                </AccordionItemState>
                                                <div className="flexCenter icon">
                                                    {item.icon}
                                                </div>
                                                <span className='primaryText'>
                                                    {item.heading}
                                                </span>
                                                <div className="flexCenter icon">
                                                    <MdOutlineArrowDropDown size={20} />
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p className="secondaryText">
                                                {item.detail}
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Value