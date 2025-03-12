import mongoose from 'mongoose';
import Budget from '../models/budget.model.js'
import Expense from '../models/expense.model.js'


export const addBudget = async (req,res)=>{
    try {
        const {category, budgetAmt,icon } = req.body;
        const user = req.user._id;

        if(!category || !budgetAmt){
            res.status(400).json({
                error:"All fields are required"
            })
        }
        if (isNaN(budgetAmt) || budgetAmt <= 0) {
            return res.status(400).json({ error: "Budget Amount must be a positive number" });
        }
        const budget = await Budget.findOne({userId: user, category});
        if(budget){
            return res.status(400).json({error:"This Budget category already exists!"})
            
            
        }
        
        

        

        const newBudget = new Budget({
            category,
            budgetAmt,
            userId : user,
            icon
        })

        if(newBudget){
            await newBudget.save();

            res.status(201).json({
                category : newBudget.category,
                budgetAmt : newBudget.budgetAmt,
                userId : user,
                icon : newBudget.icon
            })
            

        }
        
            
    } catch (error) {
        console.error("Error in addBudget:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
export const deleteBudget = async (req,res)=>{
    try {
        const {id : budgetId} = req.params;
        const userId = req.user._id;
        // if(!category){
        //     res.status(400).json({
        //         error:"Budget category is required"
        //     })
        // }
        const budget = await Budget.findOne({userId, _id : budgetId})

        if(budget){
            await Expense.deleteMany({ userId,budgetId  });
            await budget.deleteOne();

            res.status(200).json({
                message:"Budget is successfully deleted"
            })
        }
        else{
            res.status(400).json({
                error:"Budget not found"
            })
        }
        
        
        
    } catch (error) {
        console.log("Error while deleting the budget",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}

export const allBudgets = async(req,res)=>{
    try {
        const user = req.user._id;
        const objectIdUser = new mongoose.Types.ObjectId(user); //MongoDB stores _id fields as ObjectId, as userId is a string, Mongoose won't find a match hence MongoDB stores _id fields as ObjectId, so if userId is a string, Mongoose won't find a match Convert to ObjectId
        const budgets = await Budget.find({userId : objectIdUser});

        if(budgets.length ===0){
            return(
                res.status(404).json({error:"No Budgets found"})

            )
           
            
        }

        const findBudgetSpent = await Promise.all(
            budgets.map(async (budget)=>{
                const totalSpent = await Expense.aggregate([
                    {$match : { userId : budget.userId, budgetId : budget._id }},
                    { $group : {_id : null , total : { $sum : "$amount"}, count: { $sum: 1 } }},
                   
                ])
                const spent = totalSpent.length > 0 ? totalSpent[0].total : 0;
                const noOfExpenses = totalSpent.length > 0 ? totalSpent[0].count : 0;
                const remaining = budget.budgetAmt - spent; 

                

                await Budget.findOneAndUpdate(
                    {_id : budget._id},
                    { $set : {spent}  },
                    { new: true }
                );
                return {
                    ...budget.toObject(),
                    spent,
                    remaining : remaining >=0 ? remaining : 0,
                    noOfExpenses
                    
                };
            })
            

        );

        res.status(200).json(findBudgetSpent)  
        
    } catch (error) {
        console.log("Error while retrieving all the budgets",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}

export const updateBudget = async(req,res)=>{
    try {

        const { category , budgetAmt, icon}= req.body
        const userId = req.user._id;
       
        if (isNaN(budgetAmt) || budgetAmt <= 0) {
            return res.status(400).json({ error: "Budget Amount must be a positive number" });
        }
       

        const filter = await Budget.findOne({userId , category})

        const updatedBudget = await Budget.findOneAndUpdate(filter,
            {$set : { budgetAmt , icon },},{ new : true, runValidators: true, useFindAndModify: false});

        if (!updatedBudget) {
            return res.status(404).json({ error: "Budget not found" });
        }
        

        res.status(200).json(updatedBudget);   
    } catch (error) {
        console.log("Error while updating the budgets",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}

export const getBudget = async(req,res)=>{
    try {

        const userId = new mongoose.Types.ObjectId(req.user._id)
        const {id : budgetId }= req.params;
        if(!budgetId){
            return res.status(400).json({
                error : "Please select the budget"
            })
        }


        const budget = await Budget.findOne({userId, _id : budgetId});

        if(budget){
            res.status(200).json(budget)
        }

        
        
    } catch (error) {
        console.log("Error while fetching  budget",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}