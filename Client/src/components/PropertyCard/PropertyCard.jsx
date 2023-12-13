import React from 'react'
import "./PropertyCard.css"
import { AiFillHeart } from "react-icons/ai"
import { truncate } from "lodash"
import { useNavigate } from 'react-router-dom'
import Heart from '../Heart/Heart'

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className='flexColEnd r-card'
      onClick={() => navigate(`../proporties/${card.id}`)}
    >
      <div className='heart'><Heart id={card.id} /></div>
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span>$</span>
        <span style={{ color: "orange" }}>{card.price}</span>
      </span>
      <span className='primaryText'>{truncate(card.title, { length: 15 })}</span>
      <span className='secondaryText'>{truncate(card.description, { length: 80 })}</span>
    </div>
  )
}

export default PropertyCard