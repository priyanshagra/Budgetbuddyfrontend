import React from 'react'
import form from'./form'
import { useGlobalContext } from './globalcontext'
import Form from './form'

const Income = () => {
  const {addIncome} = useGlobalContext()
  return (
    <div>
      <div className="income-content">\
          <div className="form-container">
            <Form/>
          </div>
          <div className="income">

          </div>
      </div>
    </div>
  )
}


export default Income;
