import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ButtonAppBar from './components/navbar'
import URLTable from './components/table'

ReactDOM.render(
  <React.StrictMode>
    <ButtonAppBar/>
    <App/>
    <URLTable/>
  </React.StrictMode>,
  document.getElementById('root')
);

