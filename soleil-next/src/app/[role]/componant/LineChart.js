'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function LineChart({ title, chartData, color }) {

  const options = {
    responsive: true,
    tension: 0.4, 
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
      },
    },
    animation: {
      delay: (context) => context.dataIndex * 150, 
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  if (!chartData) return <p>Loading...</p>

  return (
    <Line
      options={options}
      data={{
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            borderColor: color,
            backgroundColor: `${color}33`,
            fill: true, 
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      }}
    />
  )
}