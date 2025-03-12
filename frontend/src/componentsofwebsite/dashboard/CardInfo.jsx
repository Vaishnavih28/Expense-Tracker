/* eslint-disable react/prop-types */
import { PiggyBank,  ReceiptText, Wallet,  } from 'lucide-react';
import { useEffect, useState } from 'react';



const CardInfo = ({ budgets, expenses,incomes }) => {

    useEffect(()=>{
        incomes&&expenses&&budgets&&CalculateValues();

    },[incomes.length,expenses.length,budgets.length])



   

    
    const [totalExpenses,setTotalExpenses] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    
    

    const CalculateValues = ()=>{
        let totalExpense = 0;
        let totalIncomes = 0;
        expenses.map((expense)=>{
            totalExpense = totalExpense + expense.amount;

        })
        setTotalExpenses(totalExpense)
        incomes.map((income)=>{
            totalIncomes = totalIncomes + income.amount
        })
        setTotalIncomes(totalIncomes)

        
        
    }

    

    

    
    
    

  return (
    <div>
        {budgets?.length >0 ? 
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Income</h2>
                <h2 className='font-bold text-2xl'>₹ {totalIncomes}</h2>
            </div>
            <Wallet className='bg-purple-800 p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Spend</h2>
                <h2 className='font-bold text-2xl'>₹ {totalExpenses}</h2>
            </div>
            <ReceiptText className='bg-purple-800 p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Budgets</h2>
                <h2 className='font-bold text-2xl'>{budgets?.length || 0}</h2>
            </div>
            <PiggyBank className='bg-purple-800 p-3 h-12 w-12 rounded-full text-white'/>
        </div>
    </div>
    : <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1,2,3].map((item,index)=>(
            <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'key={index}>

            </div>
        ))}
        </div>}
    </div>
  )
}

export default CardInfo