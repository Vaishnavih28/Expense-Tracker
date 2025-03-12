import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import CardInfo from "./CardInfo";
import useBudgetStore from '@/zustand/useBudgetStore'
import BarChartDashboard from "./BarChartDashboard";
import BudgetItem from "../budgets/BudgetItem";
import ExpenseListTable from "../expenses/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

   const { authUser} = useAuthContext();
   const navigate = useNavigate();
   const {budgets,expenses,incomes, fetchBudgets,fetchExpenses, fetchIncomes} = useBudgetStore();

   useEffect(()=>{
    fetchBudgets();
    fetchExpenses();
    fetchIncomes();
    
   },[])

   const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  
   



   


  return (
     <>
      { budgets.length > 0 ? 
    <div className='p-8'>
      <h2 className="font-bold text-3xl">Hi {authUser.fullname} </h2>
      <p className="text-gray-500">Manage your money with expense tracker !!</p>
      
      <CardInfo budgets={budgets} expenses={expenses} incomes ={incomes} />
      <div className="grid grid-col-1 lg:grid-cols-3  mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgets={budgets}  />
          <h2 className='mt-4 font-bold '>Latest Expenses</h2>
          <ExpenseListTable expenses={sortedExpenses} />
        </div>
        <div>
        <h2 className="font-bold text-lg mb-2">Latest Budgets</h2>
        <div className=" grid gap-5">
          
          {budgets.map((budget,index)=>(
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
        </div>
        

      </div>
     
    </div>
    :
    <>
      <div className="p-8 w-full h-[80vh] ">
      <h2 className="font-bold text-3xl">Hi {authUser?.fullname} !</h2>
      <p className="text-gray-500">Budget Wisely, Spend Happily 😄</p>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h2 className=" text-xl font-bold">Create Budgets to add your expenses!!</h2>
      <Button onClick = {()=> navigate('/dashboard/budgets')} className='bg-purple-800 hover:bg-purple-950'>Get Started</Button>
      </div>
      </div>
      </>}

    </>
  )
}

export default Dashboard