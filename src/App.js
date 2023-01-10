import logo from './logo.svg';
import './App.css';
import Caver from 'caver-js';

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const COUNT_CONTRACT_ADDRESS = '0x52b415CC3D951a3B707911B542a5F63bF2070aF6';
const ACCESS_KEY_ID = 'KASKVQPIZU3LJ7M2CE8DS9HU';
const SECRET_ACCESS_KEY = 'F06s3XjM7GBsq9kJBAF0vcKSbkno4c2zoaRnIq1A';
const CHAIN_ID = '1001';
const COUNT_ABI = '[ { "inputs": [], "name": "retrieve", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "num", "type": "uint256" } ], "name": "store", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]';
// eslint-disable-next-line
const author_value = Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64");
const option = {
 headers: [
  {
    name: "Authorization",
    value: "Basic " + author_value
  },
  {
    name: "x-chain-id",
    value: CHAIN_ID
  }
 ]
};

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS)
const readCount = async() => {
  const _count = await CountContract.methods.retrieve().call();
  console.log(_count);
};

function App() {
  readCount();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          GOOD! <code>src/App.js</code> and save to reload.
        </p>
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
