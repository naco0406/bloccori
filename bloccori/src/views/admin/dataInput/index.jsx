/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { connectWallet, registerPrice, safeMint, registerJeonse, registerJeonip, setOpenDoor, getPriceOf, getJeonipOf, 
  getJeonseOf, get_open_door } from "../../../blockchaincontroller/blockcontrol";

import Card from "components/card/Card.js";
// 블록체인
import Web3 from "web3";
import {useState, useEffect} from 'react';
import { ERC721ABI } from "../../../config/constants/abi";
import { ERC721contract } from "../../../config/constants/contracts";
import { Wallet } from "ethers";
import WalletConnect from "@walletconnect/client";
import { useCookies } from 'react-cookie';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("green.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("green.500", "white");
  const brandStars = useColorModeValue("green.500", "green.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("green.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let account = '';
  const [cookies, setCookie, removeCookie] = useCookies(['connected']);
  const isConnected = cookies.connected;

  if (isConnected == 'true') {
		// document.getElementById("connect").innerHTML = "Connected";
		// document.getElementById("connect").disabled = true;
    console.log('isConnected');
    console.log(isConnected);
	} else {
		// document.getElementById("connect").innerHTML = "Wallet Connect";
		// document.getElementById("connect").disabled = false;
    console.log('else');
    console.log(isConnected);
	}

/*
  // 블록체인 start
  const [account, setAccount] = useState('');
  const web3 = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
  const connectWallet = async () => {
    let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
    console.log(account);
    const wei = web3.eth.getBalance(accounts[0]);
    //console.log(wei);
  };

  connectWallet();
  // 블록체인 end

  function clicked() {
    alert('hi');
  }

  let registerPriceContract = new web3.eth.Contract(ERC721ABI, ERC721contract);
  async function registerPrice() {
    await registerPriceContract.methods.registerTradePrice(0, 10000).send({from:account, gas:500000})
  }
  registerPrice();
*/

  return (
    // <DefaultAuth illustrationBackground={illustration} image={illustration}>
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} grid-row-gap= '20px'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Data Input
        </Heading>
        <Text
          mb='36px'
          ms='4px'
          color={textColorSecondary}
          fontWeight='400'
          fontSize='md'>
          Mint and Register
        </Text>
      </Box>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* blockchain */}
        <Button
          colorScheme='green'
          onClick={async() => {
            account = await connectWallet();
            if (account && account.length > 20) {
              document.getElementById("connect").innerHTML = "Connected";
            }
          }}
          id="connect"
          fontSize='sm'
          // variant='brand'
          fontWeight='500'
          w='100%'
          h='50'
          mb='24px'>
          Wallet Connect
        </Button>
        
        
        <Card>
          <SimpleGrid columns={2} gap='20px' mb='20px'>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                NFT Minting
              </FormLabel>
              <Input
                id='mintNum'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={() => {safeMint(account, document.getElementById('mintNum').value);
                  console.log(account);
                  console.log(document.getElementById('mintNum').value);}}
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Mint
              </Button>
            </FormControl>


          {/* register price */}
            {/* </SimpleGrid><SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'> */}
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Register Price
              </FormLabel>
              <Input
                id='rpTokenId'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              <Input
                id='rpPrice'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Price (Integer, MATIC)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={() => {registerPrice(document.getElementById('rpTokenId').value, document.getElementById('rpPrice').value)}}
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Register Price
              </Button>
            </FormControl>
          </SimpleGrid>
        </Card>
        

        {/* register Jeonse */}
        <Card>
          <SimpleGrid columns={3} gap='20px' mb='20px'>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Register Jeonse
              </FormLabel>
              <Input
                id='rjTokenId'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              <Input
                id='rjAddress'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Wallet Address (Jeonse Contractor)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={() => {registerJeonse(document.getElementById('rjTokenId').value, document.getElementById('rjAddress').value);console.log(document.getElementById('rjTokenId').value); console.log(document.getElementById('rjAddress').value);}}
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Register Jeonse
              </Button>
            </FormControl>
            {/* </SimpleGrid> */}

            {/* register Jeonip */}
            {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'> */}
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Register Jeonip
              </FormLabel>
              <Input
                id='rjiTokenId'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              <Input
                id='rjiAddress'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Wallet Address (Person who Jeonip)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={() => {registerJeonip(document.getElementById('rjiTokenId').value, document.getElementById('rjiAddress').value);
                console.log(document.getElementById('rjiTokenId').value);
                console.log(document.getElementById('rjiAddress').value);}}
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Register Jeonip
              </Button>
            </FormControl>
            {/* </SimpleGrid> */}

            {/* register setOpenDoor */}
            {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'> */}
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Set Open Door
              </FormLabel>
              <Input
                id='sodTokenId'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              <Input
                id='sodTime'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Unix Time Stamp (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={() => {setOpenDoor(document.getElementById('sodTokenId').value, document.getElementById('sodTime').value);}
                  }
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Set Open Door
              </Button>
            </FormControl>
          </SimpleGrid>
        </Card>


        {/* 조회 */}
        <Card>
          <SimpleGrid columns={1} gap='20px' mb='20px'>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Search Blockchain Jeonse Log
              </FormLabel>
              <Input
                id='searchTokenId'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='NFT ID (Integer)'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              
              <Button
                colorScheme='green'
                onClick={async () => {
                  let price = await getPriceOf(document.getElementById('searchTokenId').value);
                  let jeonse = await getJeonseOf(document.getElementById('searchTokenId').value);
                  let jeonip = await getJeonipOf(document.getElementById('searchTokenId').value);
                  let door = await get_open_door(document.getElementById('searchTokenId').value);
                  
                  document.getElementById("nftPrice").innerHTML = "NFT Price : " + price;
                  document.getElementById("nftJeonse").innerHTML = "NFT Jeonse : " + jeonse;
                  document.getElementById("nftJeonip").innerHTML = "NFT Jeonip : " + jeonip;
                  document.getElementById("nftOpendoor").innerHTML = "NFT Open Door : " + door;
              }}
                fontSize='sm'
                // variant='green'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Search Jeonse Info
              </Button>
            </FormControl>

            <FormLabel
                display='flex'
                id='nftPrice'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
            </FormLabel>
            <FormLabel
                display='flex'
                id='nftJeonse'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
              </FormLabel>
            <FormLabel
                display='flex'
                id='nftJeonip'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
            </FormLabel>
            <FormLabel
                display='flex'
                id='nftOpendoor'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
            </FormLabel>
            {/* </SimpleGrid> */}
          </SimpleGrid>
        </Card>

        {async() => {
          account = await connectWallet();
          if (account && account.length > 20) {
            document.getElementById("connect").innerHTML = "Connected";
            document.getElementById("connect").disabled = true;
          }
        }}
      </Box>
    </Box>
    // </DefaultAuth>
  );
}

export default SignIn;
