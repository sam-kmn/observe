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
    <div className="flex flex-col px-4 lg:pb-2 lg:h-screen">

      <Header useUser={[user, setUser]} className='flex-initial py-6' />

      <ColumnCreator useColumns={[columns, setColumns]} user={user} />

      <main className="flex flex-auto flex-col lg:flex-row  gap-5">

        <section className="flex flex-col flex-1 gap-10">
          <LineChart className='basis-1/2 w-full' data={[columns, rows]}/>
          <BarChart className='basis-1/2 w-full' data={[columns, rows]}/>
        </section>

        <section className="flex flex-1">
          <Table columns={columns} rows={rows} setRows={setRows} />          
        </section>

      </main>

    </div>
  )
}

