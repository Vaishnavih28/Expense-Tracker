import express from'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { addIncome, deleteIncome, getAllIncomes } from '../controller/income.controller.js';

const router = express.Router();

router.post("/add",protectRoute, addIncome)
router.delete("/delete/:id",protectRoute, deleteIncome)
router.get("/",protectRoute,getAllIncomes)

export default router

