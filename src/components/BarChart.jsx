
import {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { useTimeline } from '../contexts/Timeline';
// import useLocalStorage from '../hooks/useLocalStorage';
// import { useData } from '../contexts/Data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function BarChart({className, data}) {

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
    if (!rows.length) return 
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
      <Bar options={options} data={chartData} />
    </div>
  )
}
