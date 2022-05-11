import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';
import AddIcon from '../Icons/Add'
import EditIcon from '../Icons/Edit'
import styles from './DataTable.module.css'
import Btn from "../Btn";

const DataTable = ({className, columns, rows, rowSort, setEditor}) => {


  return Object.keys(columns).length > 0 && (<>
  <div className={`${className} flex flex-col`}>
    <header className="flex flex-row items-center justify-between w-full px-4 py-3 bg-neutral-900 rounded-t-lg">
      <div className="text-xl">Data Table</div>
      <Btn onClick={() => setEditor(true)} className="flex flex-row items-center gap-2 text-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" >
        <AddIcon />
        <div>New row</div>
      </Btn>
    </header>

    <table className={styles}>
      <thead>
        <tr>
          <th>Date</th>
          {Object.keys(columns).map( label => 
          <th key={label}>{label}</th> )}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>

        {/* rows */}
        {rows && rowSort([...rows], false).map( day => (
          <tr key={day.id}>
            <td>{dayjs(day.date).format('DD.MM.YYYY')}</td>
            {day.dataset.map( value => 
            <td key={uuid()}>{value}</td>)}
            <td>
              <button className="text-center align-middle" onClick={() => setEditor(day.id)}>
                <EditIcon className="text-indigo-300" />
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div></>) 
}

export default DataTable