import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID } from '../constants';

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

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
   const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS)
   export const readCount = async() => {
     const _count = await CountContract.methods.retrieve().call();
     console.log(_count);
   };
   
   export const getBalance = (address) => {
     return caver.rpc.klay.getBalance(address).then((response) => {
       const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
       console.log(`BALANCE: ${balance}`);
       return balance;
     })
   };
   
   export const setCount = async (newCount) => {
     try {
       const privateKey = '0x90e44397ec72cfdcec82d24ef850aa991a66cb13b442aaa6a5df1873f2b601ac';
       const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
       caver.wallet.add(deployer);
   
   
       const receipt = await CountContract.methods.store(newCount).send({
         from: deployer.address,
         gas: "0x4bfd200"
       });
       console.log(receipt);
     } catch(e) {
       console.log(`[ERROR_SET_COUNT]${e}`);
     }
   }