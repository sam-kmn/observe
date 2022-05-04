import { Link, NavLink } from "react-router-dom"
import ChartIcon from './Icons/Chart'
import DataIcon from './Icons/Data'
import GearIcon from './Icons/Gear'

const Navbar = () => {

  const transitionClass = 'hover:scale-125 transition ease-in-out duration-300'
  const activeClass = ({ isActive }) => isActive ? "text-indigo-500" : "text-white"

  return (
    <header className="flex flex-row w-full justify-between py-4 px-10 bg-black shadow-xl ">
      
      <Link to={'/'} className="flex flex-row justify-center items-center gap-2 text-xl">
        <img src="/Icon.png" alt="Logo" className="w-7 h-7" />
        <div>Observe</div>
      </Link>
      
      <nav className="flex flex-row justify-center items-center gap-5">
        <NavLink to={'/'}         className={activeClass}><ChartIcon className={transitionClass}/>  </NavLink>
        <NavLink to={'/table'}    className={activeClass}><DataIcon  className={transitionClass}/>  </NavLink>
        <NavLink to={'/settings'} className={activeClass}><GearIcon  className={transitionClass}/>  </NavLink>
      </nav>
      
    </header>
  )
}

export default Navbar