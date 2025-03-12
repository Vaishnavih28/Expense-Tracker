import CreateBudget from './CreateBudget'
//import useBudgets from '../../hooks/useBudgets'
import BudgetItem from './BudgetItem';
import useBudgetStore from '@/zustand/useBudgetStore';

const BudgetList =()=>{

  const { budgets} = useBudgetStore();
 



  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget/>
        { budgets.map((budget,index)=>(
          <BudgetItem key={index} budget= {budget} />


        ))
      
      }
      
      </div>
    </div>

  )
}

export default BudgetList