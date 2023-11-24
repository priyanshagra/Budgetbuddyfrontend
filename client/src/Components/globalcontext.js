import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';

const BASE_URL="http://localhost:8000/api/transaction/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const toast = useToast();

    //calculate incomes
    const addIncome = async (income) => {
    
        const response = await axios.post(`${BASE_URL}add-income`, income)
       
            .catch((err) =>{
                setError(err.response.data.message)
                toast({
                    title: "Error Occured!",
                    description: err.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                  });
            }) 
            toast({
            title: "successfull",
            description: "income is added",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        getIncomes()
    }

    const getIncomes = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "auth-token": cookies.UserId,
              },
          };
        const response = await axios.get(`${BASE_URL}get-income`,config)
        setIncomes(response.data.income)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const addExpense = async (income) => {
        console.log(income);
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
                toast({
                    title: "Error Occured!",
                    description: err.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                  });
            })
            toast({
                title: "successfull",
                description: "expense is added",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        getExpenses()
    }


    const getExpenses = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "auth-token": cookies.UserId,
              },
          };

        const response = await axios.get(`${BASE_URL}get-expense`,config);
        setExpenses(response.data.expense)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}