import { Navigate , Outlet, } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const ProtectedRoutes = ()=>{
    const { authUser} = useAuthContext();

    return authUser ? <Outlet /> : <Navigate to="/login" replace />;
    
    
        
        

    
};

export default ProtectedRoutes;