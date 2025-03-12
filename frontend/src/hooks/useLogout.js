import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext"; 
import toast from "react-hot-toast";



const useLogout = ()=>{

    const [ loading, setLoading] = useState(false);
    const {setAuthUser } = useAuthContext();

    const logout = async ()=>{

        setLoading(true)


        try {
            const res = await axios.post("/api/auth/logout",{},{
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            });

            setAuthUser(null);
            localStorage.removeItem("user")

            
        } catch (error) {
            toast.error(error.message)
            
        } finally {
            setLoading(false)
        }
    }
    return { logout , loading}
}

export default useLogout