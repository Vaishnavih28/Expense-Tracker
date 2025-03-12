import { useState } from "react"
import useSignup from "../../hooks/useSignup"
import { Link, useNavigate } from "react-router-dom"






const SignUp = ()=>{

  const [ fullname, setFullname] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { signup} = useSignup()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
     
   
     const success = await signup(fullname, email, password,confirmPassword)
     if(!success) return;
     else {
      
    navigate('/dashboard')
    setFullname("");
    setPassword('')
    setConfirmPassword("");
    setEmail("")

     }
    
    
      
    
  }
  
  





  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen shadow-lg shadow-purple-500/50 border-r-4 border-purple-800 ">
        <img 
          src="Expense Tracker.jpg"
          alt="Welcome image"
          className="w-full h-full object-contain "
        />
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-start gap-8 ">
        <div className="p-4 ">
          <h2 className="text-3xl   font-bold flex items-center justify-center text-purple-800 ">Welcome to Expense Tracker</h2>
          <p className="text-black mt-4 text-center  text-sm font-bold ">Smart Spending Starts with Smart Tracking</p>
        </div>
        
            <p className="text-black text-start">Create an account to get started!!</p>
          


        <div className="max-w-xl w-full mx-auto space-y-8  ">
          {/* Header Section */}
          
          

          {/* Form */}
          <form className="space-y-6  " onSubmit={handleSubmit}>
            <div className="space-y-4 ">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-700 focus:outline-none"
                  placeholder="Enter your full name" value={fullname} onChange={(e)=>{
                    setFullname(e.target.value)
                  }}
                />
              </div>

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
                  placeholder="Create a password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-700 focus:outline-none"
                  placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-purple-800 hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >Create Account
              
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to='/login' className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default SignUp