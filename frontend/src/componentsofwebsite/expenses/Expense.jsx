import { useEffect } from 'react'
import BudgetItem from '../budgets/BudgetItem'
import useBudgetStore from '@/zustand/useBudgetStore'
import AddExpense from './AddExpense'
import ExpenseListTable from './ExpenseListTable'
import useBudgets from '@/hooks/useBudgets'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import {  useNavigate } from "react-router-dom";
import EditBudget from './EditBudget'



const Expense = () => {

  


  const navigate = useNavigate();
  const { selectedBudget,  fetchBudgetExpenses,expenses, setSelectedBudget, fetchExpenses} = useBudgetStore()
  
  const category = selectedBudget?.category

  const { deleteBudget} = useBudgets();

  useEffect(()=>{
     const getexpenses = async()=>{
      try {
        if(category){
          await fetchBudgetExpenses(category)

        }else{
          await fetchExpenses();
        } 
      } catch (error) {
        console.log(error)
        
      }
    }
    getexpenses();

    
     
    
     
    
  
   },[])
   const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
   

   

  const handleDelete = async ()=>{
    try {
      await deleteBudget(selectedBudget._id);
      toast.success("Budget is successfully deleted");
      setSelectedBudget(null);
      navigate('/dashboard/budgets')

      

      
    } catch (error) {
      toast.error("Failed to delete budget");
      console.error("Delete error:", error);
      
      
    }
  }
  

  



  return (
    <>

    { selectedBudget ? <div className='p-10'>
      
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex gap-2 items-center font-bold'>
          <ArrowLeft onClick={()=>{navigate(-1)
            setSelectedBudget(null)
          }}  className='cursor-pointer font-bold size-7 '/> My Expenses
          </span>

        <div className='flex gap-2 items-center'>
          <EditBudget />

        
     
          
          <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button className='flex gap-2' variant = "destructive"><Trash />Delete</Button>

          </AlertDialogTrigger>
          <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your current budget along with expenses
          and remove your data from our servers.
        
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-purple-800' onClick = {()=>handleDelete(selectedBudget)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>
         </div>


      
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
      { selectedBudget? <BudgetItem budget = {selectedBudget} /> :

      
      <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>}
      <AddExpense />
      </div> 
      <div>
      <h2 className='mt-4 font-bold '>Latest Expenses</h2>
        
        <ExpenseListTable expenses={sortedExpenses} />
        
        </div> 
       
    </div> : 
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex gap-2 items-center font-bold'>
          <ArrowLeft onClick={()=>{navigate(-1)
           
          }}  className='cursor-pointer font-bold size-7 '/> Latest Expenses
          </span>

      </h2>
        
    <ExpenseListTable expenses={sortedExpenses} />
    
    </div>  }
    </>
    
        
      
     
    
  
   
   
  )
}

export default Expense