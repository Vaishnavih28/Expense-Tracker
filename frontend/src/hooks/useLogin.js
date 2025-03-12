import { useState } from "react"
import { toast } from "sonner"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"



const useLogin = () => {

    const [loading, setLoading]= useState(false)
    const {setAuthUser} = useAuthContext();
  

    const login = async (email, password) =>{
        const success = handleErrors (email, password)
        if(!success) return;

        setLoading(true)

        try {
            const res = await axios.post("/api/auth/login", JSON.stringify({email,password}),
        {
            headers : { 'Content-Type' : 'application/json'},
            withCredentials : true
        });

       
       


        setAuthUser(res.data);
        localStorage.setItem("user",JSON.stringify(res.data))


            

            
            
        } catch (error) {
            toast.error(error.response.data.error)
           
            
        }finally{
            setLoading(false)
        }
    }

    return {loading,login}
}

export default useLogin

function handleErrors(email, password){
    if(!email || !password){
        toast.error("Please fill all the fields")
        return false
    }
    return true

}