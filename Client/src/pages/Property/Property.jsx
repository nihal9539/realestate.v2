import React, { useState } from 'react'
import "./Property.css"
import { useQuery } from "react-query"
import { useLocation } from 'react-router-dom'
import { getProperty } from '../../utils/api'
import { PuffLoader } from 'react-spinners'
import { AiFillHeart } from 'react-icons/ai'
import { FaShower } from "react-icons/fa"
import { FaCarAlt } from "react-icons/fa"
import { MdMeetingRoom, MdLocationPin } from "react-icons/md"
import Map from '../../components/Map/Map'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../../components/BookingModal/BookingModal'
const Property = () => {
    const { pathname } = useLocation()
    const id = pathname.split("/").slice(-1)[0]
    const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id));
    // console.log(data);


    const [modelOpended,setModelOpended] = useState(false);
    const {validateLogin} = useAuthCheck()
    const {user} = useAuth0()
    if (isLoading) {
        return (
            <div className="flexCenter paddings">
                <PuffLoader />
            </div>
        )
    }
    if (isError) {
        <div className="wrapper">
            <div className="flexCenter paddings">
                <span>Error while fetching property details</span>
            </div>
        </div>
    }
    return (
        <div className='wrapper'>
            <div className="flexColStart paddings innerWidth property-container">
                <div className="like">
                    {/* Like button */}
                    <AiFillHeart size={24} color='white' />
                </div>

                {/* Image */}

                <img src={data.image} alt="" />
                <div className="flexCenter property-details">
                    {/* left side */}
                    <div className="flexColStart left">

                        {/* head */}
                        <div className="flexStart head">
                            <span className='primaryText'>{data.title}</span>
                            <span className='orangeText' style={{ fontSize: "1.5rem" }}>$ {data.price}</span>
                        </div>
                        {/* fecilities */}
                        <div className="flexStart facilities">
                            <div className="flexStart facility">
                                <FaShower size={20} color='#1F3E72' />
                                <span>{data.facilities.bathrooms} Bathrooms</span>
                            </div>
                            <div className="flexStart facility">
                                <FaCarAlt size={20} color="1F3E72" />
                                <span>{data.facilities.parkings} Parking</span>
                            </div>
                            <div className="flexStart facility">
                                <MdMeetingRoom size={20} color="1F3E72" />
                                <span>{data.facilities.bedrooms} Rooms</span>

                            </div>
                        </div>

                        {/* description */}
                        <span className="secondaryText" style={{ textAlign: "justify" }}>
                            {data.description}
                        </span>

                        {/* address */}
                        <div className="flexStart">
                            <MdLocationPin size={25} />
                            <span className='secondaryText' style={{ gap: "1rem" }}>
                                {
                                    data.address
                                }
                                {
                                    data.city
                                }
                                {
                                    data.country
                                }
                            </span>
                        </div>
                        {/* booking */}
                        <div className="flexCenter button"
                        onClick={()=>{
                            validateLogin() && setModelOpended(true)
                        }}
                        >
                            Book your Visit
                        </div>
                        <BookingModal
                        opened={modelOpended}
                        setOpened={setModelOpended}
                        propertyId = {id}
                        email={user?.email}
                        />
                    </div>
                    {/* Right Side */}
                    <div className="map">
                        <Map address={data.address} city={data.city} country={data.country} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Property