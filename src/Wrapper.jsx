import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Setup from "./components/Setup"
import useLocalStorage from './hooks/useLocalStorage'

const Wrapper = () => {

  const [columns] = useLocalStorage('columns', {})

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {Object.keys(columns).length ?
        <main className="h-full py-4 px-2 sm:px-8"><Outlet /></main> : 
        <main className="h-full"><Setup /></main>}

    </div>
  )
}

export default Wrapper