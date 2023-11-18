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
    const getIncome = async () => {
        const response=await axios.get(`${BASE_URL}get-income`)
        setIncome(response.data)
        console.log(response.data)
    }

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            income
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}