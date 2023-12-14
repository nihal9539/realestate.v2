import countries from "world-countries"


const formatteeCountries = countries.map((country)=>({
    value:country.name.common,
    label:`${country.name.common} ${country.flag}`,
    latlng:country.latlng,
    region:country.region
}))


const useCountries = ()=>{
    const getAll = ()=> formatteeCountries;
    return {getAll}
}


export default useCountries