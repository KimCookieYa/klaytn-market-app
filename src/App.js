import React, {useState} from 'react';
import logo from './logo.svg';
import QRcode from 'qrcode.react';
import { getBalance, setCount, readCount } from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import './App.css';

function onPressButton() {
  console.log('hi!');
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}

const DEFAULT_QR_CODE = 'DEFAULT';

function App() {
  const [qrvalue, setQRvalue] = useState(DEFAULT_QR_CODE);

  //readCount();
  //getBalance('0xe659293e264441782f08585c40de9325f235d779');
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQRvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQRvalue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=> {
          onClickGetAddress();
        }}> Get Address </button>
        <button onClick={()=> {
          onClickSetCount();
        }}> Set Count </button>
        <br/>
        <br/>
        <QRcode value={qrvalue} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
