import dayjs from 'dayjs'
import { useState } from 'react'
import DataEditor from '../components/DataEditor'
import DataTable from '../components/DataTable'
import useLocalStorage from '../hooks/useLocalStorage'


const Table = () => {

  const [columns] = useLocalStorage('columns', {})
  const [rows, setRows] = useLocalStorage('rows', [])

  const [editor, setEditor] = useState(false)


  return (<>
    <DataTable className='hidden sm:block' columns={columns} rows={rows} setEditor={setEditor} rowSort={rowSort} />
    {editor && <DataEditor useEditor={[editor, setEditor]} useRows={[rows, setRows]} columns={columns} rowSort={rowSort} />}
    
    <div className='sm:hidden text-center text-2xl pt-20'>
      It's very awkward to use<br />the table in vertical mode.<br /><br />
      Please rotate your<br />device to see table
    </div>
  </>)
}

export default Table

const rowSort = (rows, asc = true) => {
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