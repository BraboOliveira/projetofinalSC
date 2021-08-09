import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import  './components/table.css'
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
      <table className="table">
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
      </tbody>
    </>
  );
}

export default App;
