export const SliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
        480: {
            slidesPerView: 1
        },
        600: {
            slidesPerView: 2
        },
        750: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4
        }
    }
}


export const updateFavourite = (id, favourite) => {
    let ids = id.id
    if (favourite.includes(ids)) {
        return favourite.filter((resId) => resId !== ids)

    }
    else {
        return [...favourite, ids]
    }
}
export const checkFavourites = (id, favourite) => {

    let ids = id.id
    return favourite?.includes(ids) ? "#fa3e5f" : "white";


}
export const validateString = (value) => {

   return value?.length < 3 || value === null ? "Must have atleast 3 charecters" : null;


}