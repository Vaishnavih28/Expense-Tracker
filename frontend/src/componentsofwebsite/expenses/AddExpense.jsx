import {  useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useBudgets from "@/hooks/useBudgets";
import useBudgetStore from "@/zustand/useBudgetStore";
import { Loader } from "lucide-react";




const AddExpense = () => {

    const { addExpense } = useBudgets();
    const {selectedBudget, setSelectedBudget} = useBudgetStore();
    const [loading, setLoading] = useState(false)
   

    
    


    const [name , setName] = useState('');
    const [ amount, setAmount] = useState(0);
    const [ date, setDate] = useState('');
    const category = selectedBudget?.category

   
    

    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!name.trim() || amount <= 0) {
            return toast.error("Please enter a valid category and amount.");
        }
        try {
            setLoading(true);
            await addExpense(name,date,amount,category);
            

            const updatedBudget = {
                ...selectedBudget,
                spent : selectedBudget.spent + Number(amount) ,
                remaining : selectedBudget.spent > selectedBudget.budgetAmt ? 0 : selectedBudget.budgetAmt - selectedBudget.spent,
                noOfExpenses : selectedBudget.noOfExpenses + 1
               
            };
            setSelectedBudget(updatedBudget)

            toast.success("Expense added successfully");
           
            setAmount(0);
            setName('');
            setDate('');
            setLoading(false)


            
            
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
            
        }


    }



  return (
    <div className="border p-5 rounded-lg">
        <h2 className="font-bold text-lg">Add Expense</h2>
        
        
        <form onSubmit={handleSubmit} className="mt-2">
        <div>
            
           <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Food"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
        </div>
        
                        
        <div className="mt-2">
            <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    type="number"
                    placeholder="e.g. ₹ 400"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value )}
                />
        </div>
        <div className="mt-2">
            <h2 className="text-black font-medium my-1">Date</h2>
                <Input 
                type='date'
                
                value={date}
                
                onChange={(e)=>setDate(e.target.value)}
                
               
                 />
                 
        </div>
        <Button disabled={!(name && amount && date)|| loading} className='mt-3 w-full bg-purple-800 hover:bg-purple-950 font-medium text-white ' >{loading? <Loader className="animate-spin" /> :"Add New Expense" }</Button>
        
    </form>
    </div>
  )
}

export default AddExpense;