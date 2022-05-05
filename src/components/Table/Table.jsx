import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';
import DatePicker from "react-date-picker";
import AddIcon from '../Icons/Add'
import CloseIcon from '../Icons/Close'

import styles from './Table.module.css'
import './DatePicker.css'


const Table = ({className, columns, useRows}) => {

  const [rows, setRows] = useRows
  const [date, setDate] = useState(new Date())
  const [showEditor, setShowEditor] = useState(rows.length > 0 ? false : true)
  const [editor, setEditor] = useState({})


  const rowSorting = (rows, asc = true) => {
    if (rows) return rows.sort((a,b) => {
      let x = dayjs(a.date).format()
      let y = dayjs(b.date).format()
      let result 
      if (x > y)    result = ( asc ? 1 : -1 )
      if (x === y)  result = 0
      if (x < y)    result = ( asc ? -1 : 1 )
      return result
    })
  }

  const handleEditor = (e) => {
    setEditor({ ...editor, [e.target.name]: e.target.value })
  }

  const submitEditor = (e) => {
    if (e) e.preventDefault()
    if (!showEditor) return setShowEditor(true)
    if (Object.keys(editor) < Object.keys(columns)) return
    
    const newRow = Object.keys(columns).map( column => editor[column] )
    const newRows = [...rows,
      {
        id: uuid(),
        date: dayjs(date).toISOString(),
        dataset: newRow
      }]
    setRows(rowSorting(newRows))
    clearEditor()
  }

  const clearEditor = () => {
    setEditor({})
    setShowEditor(false)
  }

  const deleteRow = (id) => {
    setRows(rows.filter(day => day.id !== id))
  }

  return Object.keys(columns).length > 0 && (
  <div className={`${className} flex flex-col`}>
    
    <header className="flex flex-row items-center justify-between text-xl w-full px-4 py-1 bg-indigo-700 rounded-t-lg">
      <div>Data Editor</div>
      <nav className="flex flex-row gap-4">
        <button onClick={submitEditor}>
          <AddIcon />
        </button>
        {showEditor && (
          <button onClick={clearEditor}><CloseIcon /></button>
        )}
      </nav>
    </header>

    <table className={styles}>
      <thead>
        <tr>
          <th>Date</th>
          {Object.keys(columns).map( label => 
            <th key={label}>{label}</th> )}
          {!showEditor && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>

        {/* Editor */}
        {showEditor && (
          <tr>
            <td className={styles.active}><DatePicker onChange={setDate} value={date} format="dd.MM.y" clearIcon={null} calendarIcon={null} /></td>

            { Object.keys(columns).map( column => (
              <td key={column} className={styles.active}><input name={column} onChange={handleEditor} type="number" className="w-full bg-inherit text-center" /></td>
              )) }

          </tr>
        )}

        {/* rows */}
        {rows && rowSorting([...rows], false).map( day => (
          <tr key={day.id}>
            <td>{dayjs(day.date).format('DD.MM.YYYY')}</td>
            {day.dataset.map( value => <td key={uuid()}>{value}</td>)}
            { !showEditor &&
              <td>
                <button className="text-center align-middle" onClick={() => deleteRow(day.id)}>
                  <CloseIcon className="text-red-300" />
                </button>
              </td> }
          </tr>
        ))}

      </tbody>
    </table>
  </div>)
}

export default Table