import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "../context/AuthContext"

const useSignup = ()=>{

    const [loading , setLoading ] = useState(false);
    const {  setAuthUser} = useAuthContext();

    const signup = async (fullname, email, password,confirmPassword) =>{
        
        const success = handleInputErrors ( fullname, email, password,confirmPassword)
        if(!success){
            
            return false;

        } 
        
        

        setLoading(true)

        try {
            const res = await axios.post("/api/auth/signup", JSON.stringify({fullname, email, password,confirmPassword}),{
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true

            });
           
           
            setAuthUser(res.data)
          
            
            localStorage.setItem("user", JSON.stringify(res.data))
            return true;
            

            
        } catch (error) {
            toast.error(error.response.data.error)
            return false;

            
        } finally{
            setLoading(false)
        }

        

    }
    return { signup , loading}

}

export default useSignup;

function handleInputErrors (fullname, email, password,confirmPassword){
    if(!fullname ||  !password || !confirmPassword || !email){
        toast.error("Please fill all the fields")
        return false
    }

    if(password !==confirmPassword){
        toast.error("Password do not match")
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be atleast 6 characters")
        return false
    }

    return true
}