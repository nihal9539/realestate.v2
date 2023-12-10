import express from "express";
import { createUser, bookvisit, getAllBook, cancelBooking, toFav, getAllFv } from "../controllers/userControllers.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router()


router.post('/register', createUser)
router.post('/bookvisit/:id', bookvisit)
router.post('/getallbook', getAllBook)
router.post('/removebooking/:id', cancelBooking)
router.post('/tofav/:rid', toFav)
router.post('/allfav',getAllFv)

export { router as userRoute }