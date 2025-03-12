import { useState, useEffect } from "react";
import useBudgetStore from "../zustand/useBudgetStore";
import axios from "axios";
import { toast } from "sonner";

const useBudgets = () => {
    const { budgets,  fetchBudgets, expenses , setExpenses, setExpensesCount, expensesCount, fetchExpenses, fetchIncomes,fetchBudgetExpenses, selectedBudget } = useBudgetStore();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchBudgets().finally(() => setLoading(false));
    
    }, []);
  
    // Add Budget
    const addBudget = async (category, budgetAmt,icon) => {
      try {
        const response = await axios.post("/api/budgets/add", { category, budgetAmt,icon }, { withCredentials: true });
        fetchBudgets(); //Re-fetch budgets after adding
      } catch (error) {
        console.error("Error adding budget:", error);
        toast.error(error.response.data.error);
      }
    };
  
    // Update Budget
    const updateBudget = async (category, budgetAmt, icon) => {
      try {
        const response = await axios.put("/api/budgets/update", { category, budgetAmt, icon }, { withCredentials: true });
        fetchBudgets(); // Re-fetch budgets after updating
      } catch (error) {
        console.error("Error updating budget:", error);
        toast.error(error.response.data.error);
      }
    };
  
    // Delete Budget
    const deleteBudget = async (id) => {
      try {
        await axios.delete(`/api/budgets/delete/${id}`, { withCredentials: true });
        fetchBudgets(); //  Re-fetch budgets after deleting
      } catch (error) {
        console.error("Error deleting budget:", error);
        toast.error(error.response.data.error);
      }
    };
  

    

    //fetching expenses of budget
    const getExpensesForBudget = async(category)=>{
      try {
        const res = await axios.get(`/api/expenses?category = ${category}`,{withCredentials : true});
        setExpenses (res.data.data);
        setExpensesCount(res.data.count)
        

        
        
      } catch (error) {
        console.error("Error getting the Expenses", error);
        toast.error(error.response.data.error);
        
      }

      
    }

    //adding expense
    const addExpense = async (name , date,amount,category)=>{
      try {
        const res =await axios.post('/api/expenses/add',{name , date,amount,category}, {withCredentials : true});
        fetchBudgets();
        fetchBudgetExpenses(selectedBudget?.category);
        

      } catch (error) {
        console.error("Error while adding Expense", error)
        toast.error(error.response.data.error);
        
      }
    }

    const deleteExpense = async(id)=>{
      try {
        const res = await axios.delete(`/api/expenses/delete/${id}`,{withCredentials : true})
        if(selectedBudget){
          fetchBudgetExpenses(selectedBudget?.category)
        }
        else{
          fetchExpenses()
        }
       
        fetchBudgets();
        
      } catch (error) {
        console.error("Error while deleting Expense", error)
        toast.error(error.response.data.error);
        
      }
    }

    //adding income
    const addIncome = async (source , amount,date)=>{
      try {
        const res =await axios.post('/api/incomes/add',{source ,amount,date}, {withCredentials : true});
        fetchIncomes()
        

      } catch (error) {
        console.error("Error while adding Expense", error)
        toast.error(error.response.data.error);
        
      }
    }
    //delete income
    const deleteIncome = async(id)=>{
      try {
        const res = await axios.delete(`/api/incomes/delete/${id}`,{withCredentials : true})
        fetchIncomes()
        
      } catch (error) {
        console.error("Error while deleting Expense", error)
        toast.error(error.response.data.error);
        
      }
    }

 

  
    return { budgets, loading, addBudget, updateBudget, deleteBudget, addExpense,getExpensesForBudget,deleteExpense, addIncome, deleteIncome };
  };
  
  export default useBudgets;







