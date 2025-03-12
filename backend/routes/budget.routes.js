import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { addBudget, deleteBudget, allBudgets, updateBudget, getBudget } from '../controller/budget.controller.js';


const router = express.Router();

router.post("/add",protectRoute,addBudget)
router.delete("/delete/:id",protectRoute,deleteBudget)
router.get("/",protectRoute,allBudgets)
router.put("/update",protectRoute,updateBudget)
router.get('/:id',protectRoute, getBudget)

export default router