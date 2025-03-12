/* eslint-disable react/prop-types */
import useBudgetStore from '@/zustand/useBudgetStore'
import { Link } from 'react-router-dom'

const BudgetItem = ({budget}) => {

    const { setSelectedBudget} = useBudgetStore()

    const calProgressPer = ()=>{
        var perc

        if( budget.spent < budget.budgetAmt){

             perc = (budget.spent/ budget.budgetAmt) * 100;

        }else{
            perc = 100
        }
        
        
        return perc.toFixed(2);
    }
    

  return (
    <Link to='/dashboard/expenses'   onClick={()=>setSelectedBudget({...budget})}>
        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center '>
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
            <div>
                <h2 className='font-bold'>{budget.category}</h2>
                <h2 className='text-sm text-gray-500'>{budget.noOfExpenses} Item</h2>
            </div>
            
        </div>
        <h2 className='font-bold text-purple-800 text-lg '>₹ {budget.budgetAmt}</h2>
        </div>
        <div className='mt-5'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-xs text-slate-400'>₹ {budget.spent} Spent</h2>
                <h2 className='text-xs text-slate-400'>₹ {budget.remaining} Remaining</h2>
            </div>
            <div className='w-full bg-slate-300 h-2 rounded-full'>
                <div  className=' bg-purple-800 h-2 rounded-full' style={{
                    width : `${calProgressPer()}%`
                }}>

                </div>

            </div>
        </div>
        </div>
    </Link>
  )
}

export default BudgetItem