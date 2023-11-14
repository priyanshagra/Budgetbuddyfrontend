import React from 'react'
import { useGlobalContext } from './globalcontext'
import Expenseform from './Expenseform';

const Expenses = () => {
  const {addExpenses} = useGlobalContext();
  return (
    <div>
      <div className="expenses-content">
          <div className="form-container">
            <Expenseform/>
          </div>
          <div className="expenses">

          </div>
      </div>
    </div>
  )
}

export default Expenses;