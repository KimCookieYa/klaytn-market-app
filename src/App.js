import React, {useState} from 'react';
import QRcode from 'qrcode.react';
import { getBalance } from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './Market.css';
import { Alert, Container } from "react-bootstrap"

const DEFAULT_QR_CODE = 'DEFAULT';
const DEFAULT_ADDRESS = '0x0000';

function App() {
  // State Data

  // Global Data
  // address
  // nft
  const [nfts, setNfts] = useState([]);
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  
  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  // tab
  // mintInput

  // Modal

  // fetchMarketNFTs
  // fetchMyNFTs
  // onClickMint
  // onClickMyCard
  // onClickMarketCard

  // getUserData
  // getBalance('');
  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(myAddress);
      const _balance = getBalance(address);
      setMyBalance(_balance);
    });
  };
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  };

  return (
    <div className="App">
      <div style={{ backgroundColor: "black", padding: 10}}>
        <div 
        style={{
          fontSize: 30,
          fontWeight: "bold",
          paddingLeft: 5,
          marginTop: 10,
        }}> 내 지갑
        </div>
        {myAddress}
        <br/>
        <Alert 
        onClick={getUserData}
        variant={"balance"} 
        style={{ color: 'black', backgroundColor: 'white', fontSize: 25}}>
          {myBalance} KLAY
        </Alert>
      </div>
      
      {/* 주소 잔고 */}
      <Container
      style={{
        backgroundColor: 'white',
        width: 300,
        height: 300,
        padding: 20,
    }}>
      <QRcode value={qrvalue} size={256} style={{margin: "aute"}}/>
    </Container>
      
    </div>
  );
}

export default App;
