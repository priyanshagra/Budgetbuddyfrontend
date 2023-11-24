import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from './globalcontext';
import { dateFormat } from './dateFormat';
import { CryptoState } from './CryptoContext';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();
  const { incomes, expenses } = useGlobalContext();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Add this to make the chart responsive
  };

  const data = {
    labels: incomes.map((inc) => dateFormat(inc.date)),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        backgroundColor: 'green',
        tension: 0.2,
      },
    ],
  };

  const data1 = {
    labels: expenses.map((exp) => dateFormat(exp.date)),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };
  const mergedData = {
    labels: [...data.labels, ...data1.labels],
    datasets: [
      {
        label: 'Income',
        data: [...data.datasets[0].data, ...Array(data1.labels.length).fill(0)],
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expenses',
        data: [...Array(data.labels.length).fill(0), ...data1.datasets[0].data],
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };
  

  return (
    <ChartStyled className={`${isSwitchOn?"bg-gray-200 hover:bg-gray-300 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"}`}>
      <Line data={mergedData} options={chartOptions} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
