import Caver from 'caver-js';
import KIP17TokenABI from '../abi/KIP17TokenABI.json';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY,  NFT_CONTRACT_ADDRESS, CHAIN_ID } from '../constants';

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
   const NFTContract = new caver.contract(KIP17TokenABI, NFT_CONTRACT_ADDRESS);
   
   export const fetchCardsOf = async (address) => {
    // Fetch Balance
    const balance = await NFTContract.methods.balanceOf(address).call();
    console.log(`[NFT balance] ${balance}`);
    // Fetch Token IDs
    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
      const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
      tokenIds.push(id);
    }
    // Fetch Token URIs
    const tokenUris = [];
    for (let i = 0; i < balance; i++) {
      const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
      tokenIds.push(uri);
    }
    // console.log(`${tokenIds}`);
    // console.log(`${tokenUris}`);

    const nfts = [];
    for (let i = 0; i < balance; i++) {
      nfts.push({uri: tokenUris[i], id: tokenIds[i]});
    }
    console.log(nfts);
    return nfts;
   }
   
   export const getBalance = (address) => {
     return caver.rpc.klay.getBalance(address).then((response) => {
       const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
       console.log(`BALANCE: ${balance}`);
       return balance;
     })
   };

  ////  Counter Contract ÄÚµå
  //  const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

  //  export const readCount = async() => {
  //   const _count = await CountContract.methods.retrieve().call();
  //   console.log(_count);
  //  };
   
  //  export const setCount = async (newCount) => {
  //    try {
  //      const privateKey = '0x90e44397ec72cfdcec82d24ef850aa991a66cb13b442aaa6a5df1873f2b601ac';
  //      const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
  //      caver.wallet.add(deployer);
   
   
  //      const receipt = await CountContract.methods.store(newCount).send({
  //        from: deployer.address,
  //        gas: "0x4bfd200"
  //      });
  //      console.log(receipt);
  //    } catch(e) {
  //      console.log(`[ERROR_SET_COUNT]${e}`);
  //    }
  //  }