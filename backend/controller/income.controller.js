import mongoose from "mongoose";
import Income from "../models/income.model.js";

export const addIncome = async (req,res)=>{
    try {
        const { source , amount,date}=req.body
        const userId = req.user._id;
        if(!source || ! amount ||!date){
            return res.status(400).json({error: "Please fill all the fields!"})
        }
        if(isNaN(amount) || amount<0){
            return res.status(400).json({
                error:"Amount must be a positive number"
            })

        }
        const newIncome = new Income ({
            source,
            amount,
            date,
            userId
        })
        if(newIncome){
            await newIncome.save()

            res.status(200).json(newIncome)
        }


        
    } catch (error) {
        console.log("Error while adding income",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const deleteIncome = async(req,res)=>{
    try {
        const { id: incomeId }= req.params;
        const userId = req.user._id;
        const objectIdUser = new mongoose.Types.ObjectId(userId);
        if(!incomeId){
            return res.status(400).json({
                error : "Please select the Income to delete"
            })
        }
        else{
            await Income.findOneAndDelete({userId : objectIdUser, _id : incomeId})

            res.status(200).json({
                message:"Income deleted successfully"
            })
        }       
        
    } catch (error) {
        console.log("Error while adding income",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getAllIncomes = async (req,res)=>{
    try {
        const userId = req.user._id;
        const objectIdUser = new mongoose.Types.ObjectId(userId);

        const incomes = await Income.find({userId : objectIdUser})
        if(incomes.length > 0){
            res.status(200).json(incomes)
        }
        else{
            res.status(400).json({error : "No Incomes found"})
        }

        
    } catch (error) {
        console.log("Error while retrieving all incomes",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}