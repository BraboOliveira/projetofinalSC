import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import  './components/table.css'
import { DataGrid } from '@material-ui/data-grid';
const axios = require('axios');

function App() {
  const [dados, setdados] = useState([])
  let [dadosLength, setDadosLength] = useState(null);
  useEffect(() => {
    const timer1 = setTimeout(() => {
      axios.get('https://vendebelem.com/php-react/all-users.php')
    .then(function (response) {
      // handle success
      console.log(response.data.users.length);
      setdados(response.data.users);
      if(response.data.users.length != 0){
        setDadosLength(1);
      }
      else{
        setDadosLength(null);
      }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    }
    , 1000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'dados1',
    headerName: 'CÓDIGO',
    width: 300,
    editable: true,
  },
  {
    field: 'dados2',
    headerName: 'DATA/HORA',
    width: 200,
    editable: true,
  },
];

const rows = [
  { id: 1, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 35 },
  { id: 2, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 42 },
  { id: 3, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 45 },
  { id: 4, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 16 },
  { id: 5, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: null },
  { id: 6, codigo: 'A1XXXXXXXXXXXXXXXE5', data: null, age: 150 },
  { id: 7, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 44 },
  { id: 8, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 36 },
  { id: 9, codigo: 'A1XXXXXXXXXXXXXXXE5', data: '05/06/21 11:00', age: 65 },
];

  const Item =(data)=> {
    console.log(data);
    return (
        <tr>
          <td>{data.value.id}</td>
          <td>{data.value.dados1}</td>
          <td>{data.value.dados2}</td>
        </tr>
    );
 }
 
 const MyList=()=>{

    return (
    <>
       {dadosLength === null ? "Nenhum dado encontrado" : dados.map((dados) => <Item key={dados.id} value={dados} />)}
    </>
   );
 }
  return (
    < >
      {/* <table className="table">
      <caption>INFORMAÇÕES</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
      </table>
      <tbody className="table">
      {dadosLength != null ?  <MyList/> : "Aguarde obtendo informações..." }
      </tbody> */}
      <div style={{ height: 400, width: '100%' }}>
        <p style={{ height: 50, width: '100%', textAlign: 'center'}}>COMUNICANET</p>
      <DataGrid
        rows={dados}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
    </>
  );
}

export default App;
