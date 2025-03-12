/* eslint-disable react/prop-types */
import {  IndianRupee } from 'lucide-react'
import { useEffect, useState } from 'react'

const IncomeCard = ({incomes, expenses}) => {

    const [ totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const calculateIncomeandExpense = ()=>{
        let sumofIncomes =0 ;
        let sumofExpenses=0;
        incomes.map((income)=>{
            sumofIncomes = sumofIncomes + income.amount
        })
        expenses.map((expense)=>{
            sumofExpenses = sumofExpenses + expense.amount
        })
        setTotalIncome(sumofIncomes);
        setTotalExpense(sumofExpenses);
        

    }

    useEffect(()=>{
        calculateIncomeandExpense();

    },[incomes.length,expenses.length])

    const calProgressPer = ()=>{
        var perc

        if( totalExpense < totalIncome){

             perc = (totalExpense/ totalIncome) * 100;

        }else{
            perc = 100
        }
        
        
        return perc.toFixed(2);
    }


  return (
        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center '>
            <h2 className='text-2xl p-3 px-4'><IndianRupee className='bg-purple-800 p-3 h-12 w-12 rounded-full text-white' /></h2>
            <div>
                <h2 className='font-bold'>Incomes</h2>
                <h2 className='text-sm text-gray-500'>{incomes?.length} Item</h2>
            </div>
            
        </div>
        <h2 className='font-bold text-purple-800 text-lg '>₹ {totalIncome}</h2>
        </div>
        <div className='mt-5'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-xs text-slate-400'>₹ {totalExpense} Spent</h2>
                <h2 className='text-xs text-slate-400'>₹ {totalIncome > totalExpense ? totalIncome-totalExpense : 0 } Remaining</h2>
            </div>
            <div className='w-full bg-slate-300 h-2 rounded-full'>
                <div  className=' bg-purple-800 h-2 rounded-full' style={{
                    width : `${calProgressPer()}%`
                }}>

                </div>

            </div>
        </div>
        </div>   
  )
}

export default IncomeCard