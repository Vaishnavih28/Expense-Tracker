import mongoose from 'mongoose';
import Expense from '../models/expense.model.js'
import Budget from '../models/budget.model.js';


export const addExpense = async (req,res)=>{
    try {
        const { name , date,amount,category}=req.body;
        if(! name || !date || !amount || !category){
            return res.status(400).json({
                error : "Please fill all the fields!"
            })
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number" });
        }
        const userId = req.user._id;
        const budget = await Budget.findOne({userId,category})
        if(! budget){
            return res.status(400).json({error:"This budget category does not exist"})
        }
        

        const newExpense = new Expense({
            name,
            date,
            amount,
            userId,
            budgetId : budget._id
        })


        if(newExpense){
            await newExpense.save();

            if(budget){
                budget.spent += amount;
                await budget.save()
            }

            res.status(201).json({
                name,
                date,
                amount,
                userId,
                budgetId : newExpense.budgetId

            })

        }

        

        
    } catch (error) {
        console.log("Error while adding expense",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }


}
export const deleteExpense = async (req,res)=>{
    try {
        const {id : expenseId}= req.params ;
        const userId = req.user._id
        const objectIdUser = new mongoose.Types.ObjectId(userId);
        if(! expenseId){
            return res.status(400).json({
                error: "Please select the Expense to delete"
            })
        }
        else{
            const expense = await Expense.findOne({userId : objectIdUser, _id: expenseId })
            const budget = await Budget.findOne({userId : objectIdUser, budgetId : expense.budgetId})




            await Expense.findOneAndDelete({userId : objectIdUser, _id: expenseId })
            res.status(200).json({
                message: "Expense deleted successfully"
            })

            if(budget){
                budget.spent = Math.max(budget.spent - expense.amount,0)
                await budget.save()
            }

        }
        
    } catch (error) {
        console.log("Error while deleting expense",error.message)
        res.status(500).json({error:"Internal server error"})

        
    }
}
export const getAllExpenses = async(req,res)=>{
    try {
        const userId = req.user._id;
        const objectIdUser = new mongoose.Types.ObjectId(userId);
       
        
        const expenses = await Expense.find({userId :objectIdUser})
        if(expenses.length === 0){
            return res.status(400).json({
                error : "No Expenses found"
            })
        }
        else {
            res.status(200).json(expenses)
        }
       
        
    } catch (error) {
        console.log("Error while retrieving all expenses",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}
export const getExpensesForBudget = async(req,res)=>{
    try {
        const { category : category} = req.params
        const userId = req.user._id;
        if(!category){
            return res.status(400).json({
                error:"Please mention the category"
            })
        }
        const budget = await Budget.findOne({userId, category})
        if(!budget){
            return res.status(400).json({
                error:"Please mention valid budget category"
            })
        }
        const expenses = await Expense.find({userId, budgetId : budget._id})
        const count = expenses.length;
        if(expenses.length === 0){
            res.status(400).json({
                error : "No Expenses found in this category"
            })
        }
        
        else{
            
            res.status(200).json(expenses)
        }

    } catch (error) {
        console.log("Error while retrieving expenses for the Budget category",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}