import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from './globalcontext';
import { InnerLayout } from './Layouts';
import IncomeItem from './incomeItem';
import ExpenseForm from './Expenseform';
import DownloadPDFButton from './DownloadPDFButton';
import { CryptoState } from './CryptoContext';

function Expenses() {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();

    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled className={`${
          isSwitchOn
            ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
            : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
        }`}>
            <InnerLayout>
                <h2 className={`total-income ${isSwitchOn?"bg-gray-200 hover:bg-gray-300 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"}`}>Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type,currency} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                currency={currency}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                         <DownloadPDFButton jsonData={expenses} />
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
display: flex;
flex-direction: column;

.total-income {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 2rem;
  gap: 0.5rem;

  span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-green);
  }
}

.income-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;

    .form-container {
      width: 40%; /* Adjust as needed */
    }

    .incomes {
      flex: 1;
    }
  }
}
`;

export default Expenses