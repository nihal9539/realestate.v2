import React, { useContext, useState } from 'react'
import Searchbar from '../../components/SearchBar/Searchbar'
import '../Properties/Properties.css'
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from "react-spinners"
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import UserDetailsContext from '../../context/UserDetailsContext';


const Bookings = () => {
    const { data, isError, isLoading } = useProperties();
    const { userDetails: { bookings } } = useContext(UserDetailsContext)


    const [filter, setFilter] = useState("")


    if (isError) {
        return (
            <div className='wrapper'>
                <span>Error While fetching data</span>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="wrapper flexCenter" style={{ height: "60vh" }}>
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

    return (
        <div className="wrapper">
            <div className="flexCenter paddings innerWidth properties-container">
                <Searchbar className="seacrh-bar" filter={filter} setFilter={setFilter} />
                <div className="paddings flexCenter properties">
                    {
                        // data.map((card,i)=>(<PropertyCard card={card} key={i}/>))
                        data
                            .filter((property) => bookings.map((booking) => booking.id).includes(property.id))
                            .filter((property) =>
                                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                                property.country.toLowerCase().includes(filter.toLowerCase())
                            )
                            .map((card, i) => (<PropertyCard card={card} key={i} />))
                    }
                </div>
            </div>
        </div>
    )
}

export default Bookings