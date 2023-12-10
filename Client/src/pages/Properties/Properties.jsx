import React from 'react'
import Searchbar from '../../components/SearchBar/Searchbar'
import './Properties.css'
import useProperties from '../../hooks/useProperties';
import {PuffLoader} from "react-spinners"
import PropertyCard from '../../components/PropertyCard/PropertyCard';

const Properties = () => {
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
  }
    
  console.log(data);
  return (
    <div className="wrapper">
      <div className="flexCenter paddings innerWidth properties-container">
        <Searchbar className="seacrh-bar"/>
        <div className="paddings flexCenter properties">
          {
            data.map((card,i)=>(<PropertyCard card={card} key={i}/>))
          }
        </div>
      </div>
    </div>
  )
}

export default Properties