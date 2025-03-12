import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js'
import expensesRoutes from './routes/expenses.routes.js'
import BudgetRoutes from './routes/budget.routes.js'
import IncomeRoutes from './routes/income.routes.js'

const app = express();

const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json()); 
app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/expenses',expensesRoutes)
app.use('/api/budgets',BudgetRoutes)
app.use('/api/incomes',IncomeRoutes)



// app.get("/",(req,res)=>{
//     console.log("hello")
// })

app.listen(PORT,()=>{
    connectToMongoDB()
    console.log("server running on port 5000")

})