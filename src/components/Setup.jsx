import Columns from "./Columns"
import useLocalStorage from '../hooks/useLocalStorage'

const Setup = () => {
  
  const [columns, setColumns] = useLocalStorage('columns', {})


  return (
    <div className="flex flex-row justify-center items-center h-full overflow-hidden">
      <div className="w-full lg:w-1/2 pt-18 flex flex-col justify-center items-center gap-4">
        
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">Rapidly build charts<br/>in just few seconds</div>
        <div className="text-xl sm:text-2xl md:text-3xl ">Before we start though,<br/>let's setup your columns</div>
        <Columns setColumns={setColumns} />
      
      </div>
      
      <img src="unsplash.jpg" alt="" className="hidden lg:block w-1/2 h-full object-cover" />
    
    </div>
  )
}

export default Setup