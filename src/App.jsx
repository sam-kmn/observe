import Header from './components/Header';
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Table from './components/Table';
import useLocalStorage from './hooks/useLocalStorage';
import ColumnCreator from './components/ColumnCreator';

export default function App() {

  const [user, setUser] = useLocalStorage('user')
  const [rows, setRows] = useLocalStorage('rows')
  const [columns, setColumns] = useLocalStorage('columns')


  return (
    <div className="flex flex-col px-4 md:h-screen">

      <Header useUser={[user, setUser]} className='hidden md:flex w-full pl-3 py-3' />
      <ColumnCreator useColumns={[columns, setColumns]} user={user} />

      <div className="flex flex-col md:flex-row gap-7 w-full h-full">

        <div className="flex flex-col gap-10 h-screen md:h-full w-full md:w-1/2">
          <Header useUser={[user, setUser]} className='md:hidden w-full pt-3' />
          <LineChart className='flex-1 w-full' data={[columns, rows]}/>
          <BarChart className='flex-1 w-full' data={[columns, rows]}/>
        </div>

        <div className=" w-full md:w-1/2">
          <Table columns={columns} rows={rows} setRows={setRows} />     
        </div>

      </div>
    
    </div>
  )
}

