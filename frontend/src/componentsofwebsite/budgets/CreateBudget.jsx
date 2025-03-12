import  { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,DialogClose, } from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import useBudgets from "@/hooks/useBudgets";

const CreateBudget = () => {
  const { addBudget } = useBudgets();
  const [icon, setIcon] = useState("😄");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [category, setCategory] = useState("");
  const [budgetAmt, setBudgetAmt] = useState(0);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim() || budgetAmt <= 0) {
      return toast.error("Please enter a valid category and amount.");
    }

    try {
      const success = await addBudget(category, budgetAmt, icon); //toast error duplicate budget
      if(success){
        toast.success("Budget created successfully!");
      setCategory("");
      setBudgetAmt(0);
      setIcon("😄");

      }
        

      
      
      
    } catch (error) {
      console.error("Error caught in handleSubmit:", error); // Debugging

        // Extract error message safely
        const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
        toast.error(errorMessage);
    }
    
  };

  return (
    <div>
  <Dialog>
  <DialogTrigger asChild>
    <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
      <h2 className="text-3xl">+</h2>
      <h2>Create New Budget</h2>
    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Budget</DialogTitle>
      <DialogDescription asChild>
      <form onSubmit={handleSubmit} className="mt-5">
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                {/* Budget Amount */}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
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
                    Create Budget
                  </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
      
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  );
};

export default CreateBudget;
