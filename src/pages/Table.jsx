import DataEditor from '../components/Table'
import useLocalStorage from '../hooks/useLocalStorage'
// import SwitchIcon from '../components/Icons/Switch'

const Table = () => {

  const [columns] = useLocalStorage('columns', {})
  const [rows, setRows] = useLocalStorage('rows', [])

  return (<>
    <DataEditor className='hidden sm:block' columns={columns} useRows={[rows, setRows]} />
    <div className='sm:hidden text-center text-2xl pt-20'>
      It's very awkward to use<br />the table in vertical mode.<br /><br />
      Please rotate your<br />device to see table
    </div>
  </>)
}

export default Table