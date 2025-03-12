import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name:{
        type :String,
        required :true
    },
    date : {
        type:Date,
        required : true,
        trim : true,
        default : Date.now
    },
    amount : {
        type : Number,
        required : true,
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    budgetId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Budget",
        required : true
    }
})

const Expense = mongoose.model("Expense",expenseSchema)

export default Expense