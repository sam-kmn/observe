import { useState } from "react";
import Pagination from "./Pagination";

const AddBtn = ({className, onClick}) => {
  return (
    <button className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}

export default function Header({className, useUser}) {

  const [user, setUser] = useUser
  const [input, setInput] = useState('')
  const submit = () => setUser(input)


  return user.length ? (
    <header className={`${className} flex justify-between items-center`}>
      <p className="text-3xl lg:text-4xl font-semibold">
        Hello <span className="text-indigo-300">{user}</span>
      </p>
      <Pagination />
    </header>) : (

    <form onSubmit={submit} className={`flex justify-center pt-32`}>
      <input type="text" placeholder="What's Your name?" className="text-2xl bg-inherit text-center text-indigo-100 p-2 focus:outline-0" value={input} onChange={e => setInput(e.target.value)} />
      {input ? <AddBtn onClick={submit} className="text-indigo-400" /> : <></>}
    </form>)
} 


  