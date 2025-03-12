import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ()=>{
  const { login} = useLogin();
    const [ email, setEmail] = useState("");
    const [ password, setpassword]= useState("")
    const  navigate = useNavigate();
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
       
      await login(email,password);
      navigate('/dashboard')
        
      } catch (error) {
        toast.error(error.message)
        
      }
      
    };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen shadow-lg shadow-purple-500/50 border-r-4 border-purple-800">
          <img 
            src="Expense Tracker.jpg"
            alt="Welcome illustration"
            className="w-full h-full object-contain "
          />
        </div>
        
        {/* Right side - Auth form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-start gap-8 ">
          <div className="p-4 ">
            <h2 className="text-3xl  font-bold flex items-center justify-center text-purple-800">Welcome to Expense Tracker</h2>
            <p className="text-black mt-4 text-center text-sm font- ">Smart Spending Starts with Smart Tracking</p>
          </div>
          
              <p className="text-black text-start">Login to get started!!</p>
            
  
  
          <div className="max-w-xl w-full mx-auto space-y-8  ">
            {/* Header Section */}
            
            
  
            {/* Form */}
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div className="space-y-4 ">
            
  
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-700 focus:outline-none"
                    placeholder="Enter your email" value={email} onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
                  />
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-700 focus:outline-none"
                    placeholder="Enter password" value={password} onChange={(e)=>{
                      setpassword(e.target.value)
                    }}
                  />
                </div>
                
              </div>
  
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-purple-800 hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
  
            {/* Sign in link */}
            <p className="text-center text-sm text-gray-500">
            {"Don't"} have an account?{' '} 
              <Link to='/signup' className="font-medium text-blue-600 hover:text-blue-500">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>


  )

}
export default Login