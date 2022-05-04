import { TwitterPicker } from 'react-color';
import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import AddIcon from "./Icons/Add"
import CheckIcon from "./Icons/Check"

const Columns = ({columns, setColumns}) => {

  const [inputColumns, setInputColumns] = useState([])
  const [warning, setWarning] = useState('')

  useEffect(() => {
    if(!columns) return
    console.count()
    setInputColumns(Object.keys(columns).map( name => {
      return { id: uuid(), name: name, color: columns[name], colorPicker: false }
    }))

  },[columns])

  const warn = (text) => {
    setWarning(text)
    setTimeout(() => setWarning(''), 2000)
  }
  const generateInput = () => {
    setInputColumns([...inputColumns, {id: uuid(), name: '', color: '#ffffff', colorPicker: false}])
  }
  const toggleColorPicker = (id) => {
    setInputColumns(inputColumns.map(col => col.id === id ? {...col, colorPicker: !col.colorPicker} : col))
  }
  const changeColor = (id, color) => {
    setInputColumns(inputColumns.map(col => col.id === id ? {...col, color: color.hex, colorPicker: !col.colorPicker} : col))
  }
  const changeName = (id) => {
    return (event) => {
      setInputColumns(inputColumns.map(col => col.id === id ? {...col, name: event.target.value} : col))
    }
  }

  const submit = () => {
    if (!inputColumns.filter(col => col.name.length > 0).length > 0) return warn('There has to be atleast 1 column!')
    const unique = new Set(inputColumns.map(col => col.name.toLowerCase()))
    if (unique.size !== inputColumns.length) return warn('Columns has to unique!')
    const data = {}
    inputColumns.forEach( col => data[col.name] = col.color)
    setColumns(data)
  }

  return (

    <div className="flex flex-col gap-4">
      
      {/* Buttons */}
      <div className="flex flex-row gap-1 items-center justify-center sm:gap-5">
        {!columns && <button onClick={generateInput} className='flex flex-row gap-1 justify-center items-center sm:text-lg md:text-xl text-indigo-400 hover:text-white hover:bg-indigo-500 p-2 rounded transition duration-400'><AddIcon />New column</button> }
        {inputColumns.filter(col => col.name).length > 0 && <button onClick={submit} className='flex flex-row gap-1 justify-center items-center sm:text-lg md:text-xl text-green-300 hover:text-white hover:bg-green-500 p-2 rounded transition duration-400'><CheckIcon /> Save columns</button> }
      </div>

      {/* Warning */}
      {warning.length > 0 && <code className='text-sm md:text-lg text-center text-red-200'>{warning}</code>}
      
      {/* Columns */}
      <div className="flex flex-col justify-center items-center gap-5">
        {inputColumns && inputColumns.map( col => (
          
          <div key={col.id} className='flex flex-row items-end '>
            <input type="text" name='name'
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

  )
}

export default Columns