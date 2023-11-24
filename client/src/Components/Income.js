import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./globalcontext";
import { InnerLayout } from "./Layouts";
import Form from "./form";
import IncomeItem from "./incomeItem";
import { CryptoState } from "./CryptoContext";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();

    const { currency, symbol } = CryptoState();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h2 className="total-income">
          Total Income: <span>{symbol} {totalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => (
              <IncomeItem
                key={income._id}
                id={income._id}
                title={income.title}
                description={income.description}
                amount={income.amount}
                currency={income.currency}
                date={income.date}
                type={income.type}
                category={income.category}
                indicatorColor="var(--color-green)"
                deleteItem={deleteIncome}
              />
            ))}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`

  display: flex;
  flex-direction: column;

  .total-income {
    &:hover {
        background: #f0e2e5; /* Change the background color on hover */
      }
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
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

export default Income;

