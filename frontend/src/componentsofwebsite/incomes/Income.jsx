import { useEffect } from "react";
import useBudgetStore from '@/zustand/useBudgetStore'
import {  useNavigate } from "react-router-dom";
import { ArrowLeft,  } from 'lucide-react'
import AddIncome from "./AddIncome";
import IncomeListTable from "./IncomeListTable";
import IncomeCard from "./IncomeCard";

const Income = () => {

  const navigate = useNavigate();

  const {incomes,expenses, fetchIncomes,fetchExpenses} = useBudgetStore();

   useEffect(()=>{
    fetchIncomes();
    fetchExpenses();
   },[expenses.length,incomes.length])

   const sortedIncomes = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
   


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex gap-2 items-center font-bold'>
          <ArrowLeft onClick={()=>{navigate(-1)
            
          }}  className='cursor-pointer font-bold size-7 '/> My Incomes
          </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        <IncomeCard incomes={incomes} expenses={expenses} />
     
      <AddIncome />
      </div> 
      <div>
        
        <IncomeListTable incomes={sortedIncomes} />
        
        </div> 
    </div>
  )
}

export default Income