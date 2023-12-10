import express from "express";
import { createResidancy,getAllResidancies,getResidancy } from "../controllers/residancyController.js";

const router = express.Router()


router.post('/create', createResidancy)
router.get('/allresidancy', getAllResidancies)
router.get("/:id",getResidancy)

export {router as residancyRoute}