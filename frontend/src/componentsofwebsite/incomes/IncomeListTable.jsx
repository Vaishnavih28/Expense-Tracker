/* eslint-disable react/prop-types */
import useBudgets from "@/hooks/useBudgets";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const IncomeListTable = ({incomes}) => {

    const { deleteIncome} = useBudgets();

    const handleSubmit = async (income)=>{
        try {
            await deleteIncome(income._id)
            toast.success("Income delete successfully!")
            
        } catch (error) {
            toast.error(error)
            
        }

    }




    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
          return date.toLocaleDateString("en-GB");
    };
      

  return (
    <div className='mt-3'>
      <h2 className='mt-4 font-bold '>Latest Incomes</h2>
      <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>
      {incomes.map((income,index)=>(
        <div className='grid grid-cols-4 bg-slate-50 p-2' key={index}>
        <h2>{income.source}</h2>
        <h2>{income.amount}</h2>
        <h2>{formatDate(income.date)}</h2>
        <h2>
          <Trash className='text-red-600' onClick={()=>handleSubmit(income)}/>
          
        </h2>
      </div>

      ))}
    </div>
  )
}

export default IncomeListTable