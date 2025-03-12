import {  useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,DialogClose, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { toast } from "sonner";
import useBudgets from "@/hooks/useBudgets";
import useBudgetStore from '@/zustand/useBudgetStore';

const EditBudget = () => {

    const { selectedBudget, setSelectedBudget} = useBudgetStore();
    const { updateBudget } = useBudgets();
  const [icon, setIcon] = useState(selectedBudget?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [category, setCategory] = useState(selectedBudget?.category);
  const [budgetAmt, setBudgetAmt] = useState(selectedBudget?.budgetAmt);
  

  const handleUpdate = async(e)=>{
    e.preventDefault();

    if(budgetAmt <=0){
        return toast.error("Please enter a valid amount.");
    }
    try {
        await updateBudget(category, budgetAmt, icon);

        const updatedBudget = {
            ...selectedBudget,
            budgetAmt : budgetAmt,
            remaining : selectedBudget.spent > budgetAmt ? 0 : budgetAmt - selectedBudget.spent,
            icon : icon
            
           
        };
        setSelectedBudget(updatedBudget)
      toast.success("Budget updated successfully!");
      setBudgetAmt(budgetAmt);
      setIcon(icon);
        
        
    } catch (error) {
        toast.error(error.message);
        
    }

  }
  



  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
      <Button className='bg-purple-800 flex gap-2 hover:bg-purple-950'><PenBox />Edit</Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
          <DialogDescription asChild>
          <form onSubmit={handleUpdate} className="mt-5">
                    {/* Emoji Picker */}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                      className="text-lg"
                    >
                      {icon}
                    </Button>
                    {openEmojiPicker && (
                      <div className="absolute z-50">
                        <EmojiPicker
                          open={openEmojiPicker}
                          onEmojiClick={(e) => {
                            setIcon(e.emoji);
                            setOpenEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
    
                    {/* Budget Name */}
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Budget Name</h2>
                      <Input
                        placeholder="e.g. Transport"
                        value={selectedBudget.category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
    
                    {/* Budget Amount */}
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Budget Amount</h2>
                      <Input
                        type="number"
                        defaultValue = {selectedBudget.budgetAmt}
                        placeholder="e.g. ₹5000"
                        value={budgetAmt}
                        onChange={(e) => setBudgetAmt(e.target.value )}
                      />
                    </div>
    
                    {/* Submit Button */}
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                      <Button
                        type="submit"
                        className="w-full mt-5 bg-purple-800 hover:bg-purple-950"
                        disabled={!category.trim() || budgetAmt <= 0}
                      >
                        Update Budget
                      </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
          
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default EditBudget