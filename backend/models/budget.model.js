import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    category : {
        type: String,
        required : true,
        
    },
    budgetAmt : {
        type : Number,
        required : true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    spent :{
        type:Number,
        default : 0
    },
    icon:{
        type: String,
        
    }

    
   

       
    
});
//   budgetSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
//     await Expense.deleteMany({ userId: this.userId, category: this.category });
//     next();
//   });
budgetSchema.index({ user: 1, category: 1 }, { unique: true });

const Budget = mongoose.model("Budget",budgetSchema)

export default Budget