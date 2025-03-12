import {  Route, Routes,Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Budget from "../componentsofwebsite/budgets/Budget";
import Dashboard from "../componentsofwebsite/dashboard/Dashboard";
import Expense from "../componentsofwebsite/expenses/Expense";
import Income from "../componentsofwebsite/incomes/Income";
import DashboardLayout from "../pages/overview/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import SignUp from "../pages/signup/SignUp";

const AppRoutes = ()=>{
    return(
        
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path='budgets' element={<Budget />} />
                <Route path='expenses' element={<Expense />} />
                <Route path='incomes' element={<Income />} />
                </Route>
                </Route>


                <Route path='*' element={<Navigate to="/dashboard" replace />} />
            </Routes>
        
    )
}

export default AppRoutes;