import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { addExpense, deleteExpense, getAllExpenses, getExpensesForBudget } from '../controller/expenses.controller.js';


const router = express.Router();

router.post("/add",protectRoute,addExpense)
router.delete("/delete/:id", protectRoute, deleteExpense)
router.get("/",protectRoute, getAllExpenses)
router.get("/:category",protectRoute,getExpensesForBudget)

export default router