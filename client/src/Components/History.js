import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from './globalcontext';
import { CryptoState } from './CryptoContext';

function History() {
    const { isSwitchOn, setIsSwitchOn } = CryptoState();

    const {transactionHistory} = useGlobalContext()

    const { currency,symbol,exchangeRatei,exchangeRateu } = CryptoState();
    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type,currency} = item
                return (
                    <div key={_id} className={`history-item ${isSwitchOn?"bg-gray-300 hover:bg-gray-400 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"}`}>
                        <p style={{
                            color: type === 'expense' ? 'red' : 'green'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'green'
                        }}>
                            {
                                type === 'expense' ? `-${symbol} ${ (currency=="INR"?amount*exchangeRatei:amount*exchangeRateu).toFixed(2)}` : `+${symbol} ${ (currency=="INR"?amount*exchangeRatei:amount*exchangeRateu).toFixed(2)}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        // background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // &:hover {
        //     background: #f0e2e5; /* Change the background color on hover */
        //   }
    }
`;

export default History