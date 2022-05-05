import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'

const Charts = () => {

  const navigate = useNavigate()
  const [columns] = useLocalStorage('columns', {})
  const [rows] = useLocalStorage('rows', [])

  useEffect(() => {
    if (!rows.length) navigate('/table', {replace: true})
  }, [rows, navigate])

  return rows.length > 0 && (
    <div className='flex flex-col h-full w-full gap-5'>
      <LineChart data={[columns, rows]} className='basis-1/2' />
      <BarChart data={[columns, rows]} className='basis-1/2' />
    </div>
  )
}

export default Charts