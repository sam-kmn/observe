import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTimeline } from '../contexts/Timeline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({className, data }) {

  const [columns, rows] = data
  const [timeline] = useTimeline()
  const [chartData, setChartData] = useState({})

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };
  
  useEffect(() => {
    if (!rows.length || !Object.keys(columns).length) return 
    setChartData({
      labels: (timeline === 'all' ? 
        rows.map( day => dayjs(day.date).format('DD-MM')) :
        rows.slice(-timeline).map( day => dayjs(day.date).format('DD-MM'))
      ),
      
      datasets: Object.keys(columns).map( column => ({
        borderColor: columns[column],
        backgroundColor: columns[column],
        label: column,
        
        data: (timeline === 'all' ? 
          rows.map( day => day.dataset[Object.keys(columns).indexOf(column)] ) : 
          rows.slice(-timeline).map( day => day.dataset[Object.keys(columns).indexOf(column)] )
        )
      }))
    })

  }, [rows, columns, timeline])



  return chartData.datasets && ( 
    <div className={className}>
      <Line options={options} data={chartData} />
    </div>
  )
}

