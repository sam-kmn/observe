import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import Modal from './Modal'
import Btn from './Btn'
import CloseIcon from './Icons/Close'

const DataEditor = ({useEditor, columns, useRows, rowSort}) => {

  const [editor, setEditor] = useEditor
  const [rows, setRows] = useRows
  
  const initialState = () => {
    if (editor === true){
      const data = {}
      for (let column in columns) data[column] = 0
      return data

    } else {

      const data = {}
      const row = rows.find( row => row.id === editor)
      setDate(dayjs(row.date).format('YYYY-MM-DD'))
      for (const [index, column] of Object.keys(columns).entries()) {
        data[column] = row.dataset[index]
      }
      return data
    }
  }

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [input, setInput] = useState(() => initialState())
  const handleInput = (e) => setInput({ ...input, [e.target.name]: e.target.value})
  const reset = () => setInput(initialState())
  const close = () => setEditor(false)
  const save = () => {
    if (Object.values(input).includes('')) return console.log('error');
    const data = {
      id: (editor === true ? uuid() : editor),
      date: date,
      dataset: Object.values(input)
    }
    if (editor === true) setRows(rowSort([...rows, data]))
    else setRows(rowSort(rows.map(row => row.id === editor ? data : row)))
    close()
    // else setRows([ rows.filter(row => row.id === editor), data ])
  }
  const remove = () => {setRows(rows.filter(day => day.id !== editor)); close()}

  return (
    <Modal>
      <div className='flex flex-col gap-7 bg-black p-10 rounded-lg text-lg relative'>
        
        <Btn onClick={close} className={'absolute top-2 right-2 text-sm !border-0 !p-1 !rounded-full border-red-400 text-red-400 hover:bg-red-400 hover:text-black'}><CloseIcon /></Btn>

        <header className='text-4xl text-center'>
          {editor === true ? 'New row' : 'Edit row'}
        </header>
        
        <div className="flex flex-row justify-center">
          <input type="date" className='text-xl bg-inherit text-white text-center' value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="flex flex-col gap-3">
          {Object.keys(input) && Object.keys(input).map(column => (
            <div className='flex flex-row justify-between items-end gap-20' key={column}>
              <div>{column}</div>
              <input className='w-20 text-center bg-inherit border-b-2' value={input[column]} onChange={handleInput} name={column} type="number"  placeholder='' />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-evenly gap-3 mt-5">
          <Btn onClick={reset} className={'text-sm border-white text-white hover:bg-white hover:text-black'}>Reset</Btn>
          <Btn onClick={save} className={'text-sm border-green-400 text-green-400 hover:bg-green-400 hover:text-black'}>Save</Btn>
          { editor !== true && <Btn onClick={remove} className={'text-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-black'}>Delete</Btn>}
        </div>

      </div>
    </Modal>
  )
}

export default DataEditor