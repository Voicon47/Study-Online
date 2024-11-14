// components/UserChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UserChartProps {
  data: { date: string; totalUsers: number; paidUsers: number }[];
}

const UserChart: React.FC<UserChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Tổng người dùng',
        data: data.map((item) => item.totalUsers),
        borderColor: 'rgba(54, 162, 235, 1)', // Blue line color for total users
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill for total users
        fill: true,
        tension: 0.3,
        pointRadius: 8,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
      },
      {
        label: 'Người dùng trả phí',
        data: data.map((item) => item.paidUsers),
        borderColor: 'rgba(255, 99, 132, 1)', // Red line color for paid users
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red fill for paid users
        fill: true,
        tension: 0.3,
        pointRadius: 8,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 16,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: {
          size: 18,
        },
        bodyFont: {
          size: 16,
        },
        padding: 15,
        displayColors: false,
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} users`;
          },
        },
      },
      title: {
        display: true,
        text: 'BIỂU ĐỒ THỐNG KÊ ',
        font: {
          size: 24,
          weight: 'bold',
          family: 'Arial, sans-serif',
        } as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
          font: {
            size: 18,
            family: 'Arial, sans-serif',
          },
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Người dùng',
          font: {
            size: 18,
            family: 'Arial, sans-serif',
          },
          color: '#333',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 50,
          font: {
            size: 16,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Line data={chartData} options={options} height={500} />;
};

export default UserChart;
