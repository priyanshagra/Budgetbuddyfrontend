import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react';

const BASE_URL="http://localhost:8000/api/transaction/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [income, setIncome] = useState([])
    const [expense, setExpense] = useState([])
    const [error, setError] = useState([])
    const addIncome = async (income) => {
        const response=await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }
    const addExpenses = async (expenses) => {
        const response=await axios.post(`${BASE_URL}add-expense`, expenses)
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }
    return(
        <GlobalContext.Provider value={{
            addIncome, addExpenses 
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}