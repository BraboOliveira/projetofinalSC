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
  const [auto, setAuto] = useState({id: '1',auto1:'1',auto2: '1'})
  let [dadosLength, setDadosLength] = useState(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      axios.get('http://comunicanet.online/php-react/all-users.php')
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

  // const updateState = () => {
  //   console.log(JSON.stringify(auto))
  //   axios.post('https://vendebelem.com/php-react/update-user.php',JSON.stringify(auto))
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  // }
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
      {dadosLength !== null ?  <MyList/> : "Aguarde obtendo informações..." }
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
          setAuto({id:auto.id, auto1:'2', auto2:auto.auto2});
          }} variant="contained" color="primary">
          Liga
        </Button>
        <Button onClick={() => {
          setAuto({id:auto.id, auto1:'1', auto2:auto.auto2});
          }} variant="contained" color="secondary">
          Desliga
        </Button>
      </div>
      <div style={{ padding: 10}}>
        <p style={{ height: 50, width: '100%', textAlign: 'center', padding: 10}}>Equipamento 02</p>
        <Button onClick={() => { 
          setAuto({id: auto.id, auto1:auto.auto1, auto2:'2'});
          }} variant="contained" color="primary">
          Liga
        </Button>
        <Button onClick={() => { 
          setAuto({id:auto.id, auto1:auto.auto1, auto2:'1'});
          }} variant="contained" color="secondary">
          Desliga
        </Button>
      </div>
      </Box>
      <div style={{ textAlign: 'center', padding: 200}}>
        <Button onClick={() => { alert('Apagando dados do Banco') }} variant="contained" color="secondary">
          Apagar Dados
        </Button>
      </div>
    </div>
    </>
  );
}

export default App;
