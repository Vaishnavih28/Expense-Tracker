import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const useBudgetStore = create((set)=>({
    budgets : [],
    setBudgets : (newBudgets)=> set({budgets : newBudgets}),
    fetchBudgets: async () => {
        try {
          const response = await axios.get("/api/budgets", { withCredentials: true } );
          set({ budgets: response.data });
        } catch (error) {
          toast.error(error.response.data.error)
          set({budgets : []})
        }
      },
      selectedBudget : null,
      setSelectedBudget : (budget)=> set({selectedBudget : budget}),

      expenses : [],
      setExpenses : (newExpenses) => set({expenses : newExpenses}),

      incomes : [],
      setIncomes : (newIncomes)=> set({incomes : newIncomes}),

      fetchExpenses: async () => {
        try {
          const response = await axios.get("/api/expenses", { withCredentials: true } );
          set({ expenses: response.data });
        } catch (error) {
          toast.error(error.response.data.error)
          set({expenses : []})
        }
      },
      fetchBudgetExpenses: async (category) => {
        try {
          const response = await axios.get(`/api/expenses/${category}`, { withCredentials: true } );
          set({ expenses: response.data });
        } catch (error) {
          toast.error(error.response.data.error)
          set({expenses : []})
        }
      },
      fetchIncomes: async () => {
        try {
          
          const response = await axios.get("/api/incomes", { withCredentials: true } );
          set({ incomes: response.data });
        } catch (error) {
          toast.error(error.response.data.error)
          set({incomes : []})
        }
      },
    
}));

export default useBudgetStore;