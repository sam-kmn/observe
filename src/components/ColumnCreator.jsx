import { useState } from "react"
import { v4 as uuid } from 'uuid';
import { TwitterPicker } from 'react-color';

import AddIcon from './Icons/Add';
import CheckIcon from './Icons/Check';

const ColumnCreator = ({className, useColumns, user}) => {

  const [columns, setColumns] = useColumns
  const [inputCols, setInputCols] = useState([])

  const generateInput = () => {
    setInputCols([...inputCols, {id: uuid(), name: '', color: '#fff', colorPicker: false}])
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
  const saveColumns = () => {
    if (!inputCols.filter(col => col.name.length > 0).length > 0) return console.warn('no cols');
    const unique = new Set(inputCols.map(col => col.name))
    const data = {}
    unique.forEach( name => {
      let column = inputCols.find(col => col.name === name)
      data[name] = column.color
    })
    setColumns(data)

  }
  return !Object.keys(columns).length > 0 && user.length > 0 && (
    <div className="flex flex-col items-start pl-2 gap-3">
      <p className='text-2xl lg:text-3xl'>Looks like you are new,<br />let's start with defining columns.</p>
      
      {inputCols.length > 0 && <code className='text-sm md:text-lg text-yellow-200'>Duplicated or empty name will be ignored </code>}
      
      
      <div className="mt-2 flex flex-row gap-5 items-end">
        <button onClick={generateInput} className='flex flex-row gap-1 justify-center items-center text-xl text-indigo-400 border-indigo-400 rounded-md'><AddIcon /> Define new column</button>
        {inputCols.length > 0 && <button onClick={saveColumns} className='flex flex-row gap-1 justify-center items-center text-xl text-green-300'><CheckIcon /> Save columns</button> }
        
      </div>
    
      <div className="flex flex-col gap-3 p-4">
        {inputCols && inputCols.map( col => (
          <div key={col.id} className='flex flex-row items-end '>
            <input 
              type="text" 
              name='name'
              onChange={changeName(col.id)}
              className='bg-inherit border-b-2 text-white p-1' 
              placeholder='Column name' style={{'borderColor': col.color}}
            />
            
            <button onClick={() => toggleColorPicker(col.id)} className='w-7 h-7 rounded-full rounded-bl-none relative' style={{'backgroundColor': col.color}}>
              {col.colorPicker ? <TwitterPicker color={col.color} onChangeComplete={(color) => changeColor(col.id, color)} className='absolute -bottom-10 left-0 z-10' /> : ''}
            </button>
          </div>
        ))}
      </div>

    </div>   
  )
}

export default ColumnCreator