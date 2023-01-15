import React, {useState} from 'react';
import QRcode from 'qrcode.react';
import { getBalance, fetchCardsOf } from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './Market.css';
import { Alert, Container, Card } from "react-bootstrap"
import { NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS } from './constants';

const DEFAULT_QR_CODE = 'DEFAULT';
const DEFAULT_ADDRESS = '0x0000';

function App() {
  // State Data

  // Global Data
  // address
  // nft
  const [nfts, setNfts] = useState([]); // {tokenId: string, tokenUri: string}
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  
  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  // tab
  // mintInput

  // Modal

  // fetchMarketNFTs
  const fetchMarketNFTs = async () => {
    const _nfts = await fetchCardsOf(MARKET_CONTRACT_ADDRESS);
    setNfts(_nfts);
  };
  // fetchMyNFTs
  const fetchMyNFTs = async () => {
    const _nfts = await fetchCardsOf(myAddress);
    setNfts(_nfts);
    // [ {tokenId: 100, tokenUri: "https://asdfadsf.png"}, {tokenId: 101, tokenUri: "https://fdsafdsa.png"} ]
    // balanceOd -> 내가 가진 전체 NFT 토큰 개수를 가져온다.
    // 2
    // tokenOfOwnerByIndex -> 내가 가진 NFT token ID를 하나씩 가져온다. -> array
    // 내 지갑주소, 0 -> 100
    // 내 지갑주소, 1 -> 101
    // tokenURI -> 앞에서 가져온 tokenID를 이용해서 tokenURI를 하나씩 가져온다. -> 
    // 100 -> sdkfjis.png
    // 101 -> fasdfas.png
  };
  // onClickMint
  // onClickMyCard
  // onClickMarketCard

  // getUserData
  // getBalance('');
  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
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

        {/* 갤러리(마켓, 내 지갑) */}
        <div className='container' style={{padding: 0, width:"100%"}}>
          {nfts.map((nfts, index) => (
            <Card.Img className='img-responsive' src={nfts[index].uri} />
          ))}
        </div>
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
    <button onClick={fetchMyNFTs}>
      NFT 가져오기
    </button>
      
    </div>
  );
}

export default App;
