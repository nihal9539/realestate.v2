import express from "express";
import { createUser, bookvisit, getAllBook, cancelBooking, toFav, getAllFv } from "../controllers/userControllers.js";
import jwtCheck from "../config/auth0Config.js";


const router = express.Router()


router.post('/register',jwtCheck, createUser)
router.post('/bookvisit/:id',jwtCheck, bookvisit)
router.post('/getallbook', getAllBook)
router.post('/removebooking/:id',jwtCheck, cancelBooking)
router.post('/tofav/:rid',jwtCheck, toFav)
router.post('/allfav',jwtCheck, getAllFv)

export { router as userRoute }