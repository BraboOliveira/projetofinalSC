import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import  './components/table.css'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
const axios = require('axios');

function App() {
  const [dados, setdados] = useState([])
  const [auto, setAuto] = useState({})
  let [dadosLength, setDadosLength] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer1 = setTimeout(() => {      
      setCount(1);
      console.log('Atualiza')
      axios.get('http://comunicanet.online/php-react/all-users.php')
    .then(function (response) {
      // handle success
      setCount(0);
      console.log(response.data.success);
      if(response.data.success == 0){
        console.log('sem dados')
        setdados([])
      }
      else setdados(response.data.users);
      if(response.data.success != 0){
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
    , 5000)
    return () => {
      clearTimeout(timer1)
    }
  }, [count])

  const apagar = () => {
    axios.post('http://comunicanet.online/php-react/delete-user.php')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  useEffect(() => {
    axios.get('http://comunicanet.online/php-react/estados.php')
      .then(function (response) {
      // handle success
      console.log(response.data.estados[0]);
      setAuto(response.data.estados[0]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])


  useEffect(() => {
    console.log(JSON.stringify(auto))
    axios.post('http://comunicanet.online/php-react/update-user.php',JSON.stringify(auto))
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [auto])

  const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'dados1',
    headerName: 'C??DIGO',
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
      <caption>INFORMA????ES</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>C??digo</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
      </table>
      <tbody className="table">
      {dadosLength !== null ?  <MyList/> : "Aguarde obtendo informa????es..." }
      </tbody> */}
      <div style={{ height: 300, width: '100%'}}>
        <p style={{ height: 50, width: '100%', textAlign: 'center'}}>COMUNICANET</p>
      <DataGrid
        rows={dados}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
      <Box flexDirection="row" display="flex" justifyContent="center">
      <div style={{ padding: 10}}>
        <p style={{ height: 50, width: '100%', textAlign: 'center', padding: 10}}>Equipamento 01</p>
        <Button onClick={() => { 
          setAuto({id:'1', auto1:'2', auto2:auto.auto2});
          }} variant="contained" color="primary">
          Liga
        </Button>
        <Button onClick={() => {
          setAuto({id:'1', auto1:'1', auto2:auto.auto2});
          }} variant="contained" color="secondary">
          Desliga
        </Button>
      </div>
      <div style={{ padding: 10}}>
        <p style={{ height: 50, width: '100%', textAlign: 'center', padding: 10}}>Equipamento 02</p>
        <Button onClick={() => { 
          setAuto({id: '1', auto1:auto.auto1, auto2:'2'});
          }} variant="contained" color="primary">
          Liga
        </Button>
        <Button onClick={() => { 
          setAuto({id:'1', auto1:auto.auto1, auto2:'1'});
          }} variant="contained" color="secondary">
          Desliga
        </Button>
      </div>
      </Box>
      <div style={{ textAlign: 'center', padding: 200}}>
        <Button onClick={() => { apagar(); alert('Apagando dados do Banco') }} variant="contained" color="secondary">
          Apagar Dados
        </Button>
      </div>
    </div>
    </>
  );
}

export default App;
