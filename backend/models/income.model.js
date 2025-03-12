import mongoose from "mongoose";

const imcomeschema = new mongoose.Schema({
    source:{
        type :String,
        required :true
    },
    date : {
        type:Date,
        required : true,
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
   
})

const Income = mongoose.model("Income",imcomeschema)

export default Income