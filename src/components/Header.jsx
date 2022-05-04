import Pagination from "./Pagination";

const Header = ({className, user}) => {
  return user.length > 0 && (
    <header className={`${className} flex justify-between items-center`}>
      <p className="text-3xl lg:text-4xl font-semibold">
        Hello <span className="text-indigo-300">{user}</span>
      </p>
      <Pagination />
    </header>) 
} 


export default Header