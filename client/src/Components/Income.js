import React, { useEffect } from 'react'
import { useGlobalContext } from './globalcontext'
import Form from './form'
import {incomeItem} from './incomeItem'

const Income = () => {
  const {addIncome} = useGlobalContext()
  return (
    <div>
      <div className="income-content">
          <div className="form-container">
            <Form/>
          </div>
          <div className="income">
            {Array.isArray(income) && income.map((income) =>{
                 const { _id, title, amount, date, category, description } = income;
                 return  <incomeItem
                 id={_id}
                 title={title}
                 description={description}
                 amount={amount} date={date}
                 category={category}
                 />          
            })}
          </div>
      </div>
    </div>
  )
}

export default Income;
