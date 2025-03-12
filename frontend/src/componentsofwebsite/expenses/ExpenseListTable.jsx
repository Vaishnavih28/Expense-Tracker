/* eslint-disable react/prop-types */
import useBudgets from '@/hooks/useBudgets';
import useBudgetStore from '@/zustand/useBudgetStore'
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

const ExpenseListTable = ({expenses}) => {

  const { fetchBudgetExpenses, selectedBudget, setSelectedBudget} = useBudgetStore();
  const { deleteExpense} =useBudgets();
 

  
 

 const handleSubmit = async (expense)=>{
  try {
    if(selectedBudget){
      const updatedBudget = {
        ...selectedBudget,
        spent : selectedBudget.spent - Number(expense.amount) ,
        remaining : selectedBudget.spent > selectedBudget.budgetAmt ? 0 : selectedBudget.budgetAmt - selectedBudget.spent,
        noOfExpenses : selectedBudget.noOfExpenses - 1
       
      };
      setSelectedBudget(updatedBudget)
      await deleteExpense(expense._id)
    fetchBudgetExpenses(selectedBudget?.category)
    
    toast.success("Expense deleted successfully")

    }
    else{
      await deleteExpense(expense._id)
      //fetchExpenses();
      toast.success("Expense deleted successfully")


    }
    
    
    
    
  } catch (error) {
    toast.error("Failed to delete expense");
      console.error("Delete error:", error);
    
  }


 }

 

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  
    return date.toLocaleDateString("en-GB");
  };





  return (
    <div className='mt-3'>
      
      <div className='grid grid-cols-4 bg-slate-200 p-2 '>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>
      {expenses.map((expense,index)=>(
        <div className='grid grid-cols-4 bg-slate-50 p-2' key={index}>
        <h2>{expense.name}</h2>
        <h2>{expense.amount}</h2>
        <h2>{formatDate(expense.date)}</h2>
        <h2>
          <Trash className='text-red-600' onClick={()=>handleSubmit(expense)}/>
          
        </h2>
      </div>

      ))}
    </div>
  )
}

export default ExpenseListTable