/* eslint-disable react/prop-types */
import { BarChart, Tooltip, XAxis, YAxis,Bar, Legend, ResponsiveContainer } from "recharts"

const BarChartDashboard = ({budgets}) => {
  return (
    <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Activity</h2>
        <ResponsiveContainer width={'80%'} height={300} >
        <BarChart 
        data={budgets}
        margin={{
            top:7,
            
        }}
        >
            <XAxis dataKey='category' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='spent'  stackId = "a" fill='#6b21a8' />
            <Bar dataKey='budgetAmt'  stackId = "a" fill='#d8b4fe' />
            
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard

