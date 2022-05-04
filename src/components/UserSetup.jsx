import { useState } from "react"
import { v4 as uuid } from 'uuid';
import { TwitterPicker } from 'react-color';

import AddIcon from './Icons/Add';
import CheckIcon from './Icons/Check';

const UserSetup = ({useColumns, useUser}) => {

  const [user, setUser] = useUser
  const [columns, setColumns] = useColumns
  const [inputUser, setInputUser] = useState(user)
  const [inputCols, setInputCols] = useState([])
  const [warning, setWarning] = useState('')
  const warn = (text) => {
    setWarning(text)
    setTimeout(() => setWarning(''), 2000)
  }

  const generateInput = () => {
    setInputCols([...inputCols, {id: uuid(), name: '', color: '#ffffff', colorPicker: false}])
  }
  const toggleColorPicker = (id) => {
    setInputCols(inputCols.map(col => col.id === id ? {...col, colorPicker: !col.colorPicker} : col))
  }
  const changeColor = (id, color) => {
    setInputCols(inputCols.map(col => col.id === id ? {...col, color: color.hex, colorPicker: !col.colorPicker} : col))
  }
  const changeName = (id) => {
    return (event) => {
      setInputCols(inputCols.map(col => col.id === id ? {...col, name: event.target.value} : col))
    }
  }
  const submit = () => {
    if (!inputUser) return warn('User name is empty!')
    if (!inputCols.filter(col => col.name.length > 0).length > 0) return warn('There has to be atleast 1 column!')
    const unique = new Set(inputCols.map(col => col.name.toLowerCase()))
    if (unique.size !== inputCols.length) return warn('Columns has to unique!')
    const data = {}
    inputCols.forEach( col => data[col.name] = col.color)
    setUser(inputUser)
    setColumns(data)
  }
  return !Object.keys(columns).length > 0 && (
    <div className="flex flex-row justify-center items-center h-screen p-5">
      <div className="flex flex-col items-start gap-3 md:gap-5"> 
        
        {/* User name */}
        <input type="text" placeholder="What's Your name?" className="text-2xl md:text-3xl bg-inherit text-indigo-100 focus:outline-0" value={inputUser} onChange={e => setInputUser(e.target.value)} />
        
        {/* Text */}
        <div className='text-2xl md:text-3xl'>
          {user ? 
          <p>Looks like your columns are gone,<br />You have to define your columns again</p>:
          <p>Looks like you are new,<br />let's start with defining columns.</p>
          }
        </div>
        
        {/* Warning */}
        {warning.length > 0 && <code className='text-sm md:text-lg text-red-200'>{warning}</code>}
        
        {/* New column & Save columns */}
        <div className="mt-2 flex flex-col gap-1 items-start sm:flex-row sm:items-end sm:gap-5">
          <button onClick={generateInput} className='flex flex-row gap-1 justify-center items-center sm:text-lg md:text-xl text-indigo-400 hover:text-white hover:bg-indigo-500 p-2 rounded transition duration-400'><AddIcon /> Define new column</button>
          {inputCols.length > 0 && <button onClick={submit} className='flex flex-row gap-1 justify-center items-center sm:text-lg md:text-xl text-green-300 hover:text-white hover:bg-green-500 p-2 rounded transition duration-400'><CheckIcon /> Save columns</button> }
        </div>
      
        {/* Columns */}
        <div className="flex flex-col gap-5 p-2">
          {inputCols && inputCols.map( col => (
            <div key={col.id} className='flex flex-row items-end '>
              <input 
                type="text" 
                name='name'
                onChange={changeName(col.id)}
                className='bg-inherit border-b-2 text-white p-1 md:text-lg' 
                placeholder='Column name' style={{'borderColor': col.color}}
              />
              
              <button onClick={() => toggleColorPicker(col.id)} className='w-7 h-7 rounded-full rounded-bl-none relative' style={{'backgroundColor': col.color}}>
                {col.colorPicker ? <TwitterPicker color={col.color} onChangeComplete={(color) => changeColor(col.id, color)} className='absolute -bottom-10 left-0 z-10' /> : ''}
              </button>
            </div>
          ))}
        </div>

      </div>   
    </div>
  )
}

export default UserSetup