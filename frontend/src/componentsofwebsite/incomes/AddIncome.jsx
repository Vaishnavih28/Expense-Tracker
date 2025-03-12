import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import useBudgets from "@/hooks/useBudgets";

const AddIncome = () => {

    const { addIncome} = useBudgets();

    const [ source , setSource] = useState("");
    const [ amount, setAmount] = useState(0);
    const [date, setDate]= useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (!source.trim() || amount <= 0) {
            return toast.error("Please enter a valid category and amount.");
        }
        try {
            
            await addIncome(source, amount,date);
            toast.success("New Income added successfully")

            setSource("");
            setAmount(0);
            setDate("");
            setLoading(false)
            
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
            
        }
    }




  return (
    <div className="border p-5 rounded-lg">
        <h2 className="font-bold text-lg">Add Income</h2>
        
        
        <form onSubmit={handleSubmit} className="mt-2">
        <div>
            
           <h2 className="text-black font-medium my-1">Income Source</h2>
                <Input
                    placeholder="e.g Salary"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
        </div>
        
                        
        <div className="mt-2">
            <h2 className="text-black font-medium my-1">Income Amount</h2>
                <Input
                    type="number"
                    placeholder="e.g. ₹ 45000"
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
        <Button disabled={!(source && amount && date)|| loading} className='mt-3 w-full bg-purple-800 hover:bg-purple-950 font-medium text-white ' >{loading? <Loader className="animate-spin" /> :"Add Income" }</Button>
        
    </form>
    </div>
  )
}

export default AddIncome