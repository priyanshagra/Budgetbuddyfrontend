import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useGlobalContext } from './globalcontext';


function Form() {
    const {addIncome}=useGlobalContext
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    })

    const {title, amount, date, category, description} = inputState;

    const handleInput= name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }


    const handleSubmit = e =>{
        e.preventDefault()
        addIncome(inputState)
    }

    return (
        <div>
            hello
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="salary-title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="salary-amount"
                    onChange={handleInput('amount')}
                /> 
            </div>
            <div className='input-control'>
                <DatePicker
                    id='date'
                    placeholderText='Enter a date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className='select input-control'>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>select option</option>
                    <option value="salary" disabled>salary</option>
                    <option value="other" disabled>other</option>
                </select>
            </div>
            <div className='submit-btn'>
                <button>add income</button>
            </div>
        </div>
    )
}

export default Form;