// 블록체인
import Web3 from "web3";
import {useState, useEffect} from 'react';
import { ERC721ABI } from "../config/constants/abi";
import { ERC721contract } from "../config/constants/contracts";

const web3 = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
let registerPriceContract = new web3.eth.Contract(ERC721ABI, ERC721contract);
let account;

// 블록체인 start
export const connectWallet = async () => {
  let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
  });

  account = accounts[0];
  console.log(account);
  const wei = web3.eth.getBalance(accounts[0]);
  //console.log(wei);
  return account;
};

export const registerPrice = async (tokenId, price) => {
  await registerPriceContract.methods.registerTradePrice(tokenId, price).send({from:account, gas:500000})
}

export const registerJeonse = async (tokenId, addr) => {
  await registerPriceContract.methods.registerJeonse(tokenId, addr).send({from:account, gas:500000})
}

export const registerJeonip = async (tokenId, addr) => {
  await registerPriceContract.methods.registerJeonip(tokenId, addr).send({from:account, gas:500000})
}

export const setOpenDoor = async (tokenId, time) => {
  await registerPriceContract.methods.set_open_door(tokenId, time).send({from:account, gas:500000})
}

export const safeMint = async (addr, num) => {
  await registerPriceContract.methods.safeMint(addr, num).send({from:account, gas:500000})
}