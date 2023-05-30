// 블록체인
import Web3 from "web3";
import {useState, useEffect} from 'react';
import { ERC721ABI } from "../config/constants/abi";
import { ERC721contract } from "../config/constants/contracts";
import { useCookies } from 'react-cookie';

const web3 = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
const web3_alchemy = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.g.alchemy.com/v2/rygC0xsI-P_GcTM-KHaoWoPfX_d4R66y"));
let ERC721Contract = new web3.eth.Contract(ERC721ABI, ERC721contract);
let ERC721Contract_alchemy = new web3_alchemy.eth.Contract(ERC721ABI, ERC721contract);
let account;


// 블록체인 start
export const connectWallet = async () => {
  let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
  });

  
  account = accounts[0];
  console.log(account);
  const wei = web3.eth.getBalance(accounts[0]);

  console.log("connected working");
  return account;
};

export const registerPrice = async (tokenId, price) => {
  await ERC721Contract.methods.registerTradePrice(tokenId, price).send({from:account, gas:500000})
}

export const registerJeonse = async (tokenId, addr) => {
  await ERC721Contract.methods.registerJeonse(tokenId, addr).send({from:account, gas:500000})
}

export const registerJeonip = async (tokenId, addr) => {
  await ERC721Contract.methods.registerJeonip(tokenId, addr).send({from:account, gas:500000})
}

export const setOpenDoor = async (tokenId, time) => {
  await ERC721Contract.methods.set_open_door(tokenId, time).send({from:account, gas:500000})
}

export const safeMint = async (addr, num) => {
  await ERC721Contract.methods.safeMint(addr, num).send({from:account, gas:500000})
}

export const getPriceOf = async (tokenId) => {
  const res = await ERC721Contract_alchemy.methods.priceOf(tokenId).call();
  return res
}

export const getJeonseOf = async (tokenId) => {
  const res = await ERC721Contract_alchemy.methods.jeonseOf(tokenId).call();
  return res
}

export const getJeonipOf = async (tokenId) => {
  const res = await ERC721Contract_alchemy.methods.jeonipOf(tokenId).call();
  return res
}

export const get_open_door = async (tokenId) => {
  const res = await ERC721Contract_alchemy.methods.get_open_door(tokenId).call();
  return res
}

export const getOwnerOf = async (tokenId) => {
  const res = await ERC721Contract_alchemy.methods.ownerOf(tokenId).call();
  return res
}
/* 사용법
getJeonipOf(0).then((res) => console.log(res));
getJeonseOf(0).then((res) => console.log(res));
getPriceOf(0).then((res) => console.log(res));
get_open_door(0).then((res) => console.log(res));
*/
