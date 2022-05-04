import { useTimeline } from "../contexts/Timeline"
import useLocalStorage from "../hooks/useLocalStorage"

const Pagination = () => {
  const [rows] = useLocalStorage('rows', [])
  const [timeline, setTimeline] = useTimeline()
  const classes = 'h-full flex items-center justify-center flex-1 text-gray-400 hover:text-gray-100 hover:bg-indigo-700 transition ease-in-out duration-300'
  const activeClasses = (i) => timeline === i ? 'text-gray-50 bg-indigo-700' : ''
  
  return rows && rows.length > 4 && (
    <div className='flex flex-row justify-center'>
      <nav className='flex flex-row w-48 h-8 md:w-64 md:h-10 justify-evenly items-center border rounded-lg bg-indigo-900 border-gray-900'>
        <button onClick={() => setTimeline('all')} className={`${activeClasses('all')} ${classes} rounded-l-lg`}>All</button>
        <button onClick={() => setTimeline(Math.floor(rows.length/3))} className={`${activeClasses(Math.floor(rows.length/3))} ${classes} border-gray-900 border-x`}>{Math.floor(rows.length/3)} days</button>
        <button onClick={() => setTimeline(Math.floor(rows.length/1.5))} className={`${activeClasses(Math.floor(rows.length/1.5))} ${classes} rounded-r-lg`}>{Math.floor(rows.length/1.5)} days</button>
      </nav>
    </div>
  )
}

export default Pagination