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
import { connectWallet, registerPrice, safeMint, registerJeonse, registerJeonip, setOpenDoor } from "../../../blockchaincontroller/blockcontrol";

// 블록체인
import Web3 from "web3";
import {useState, useEffect} from 'react';
import { ERC721ABI } from "../../../config/constants/abi";
import { ERC721contract } from "../../../config/constants/contracts";
import { Wallet } from "ethers";
import WalletConnect from "@walletconnect/client";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
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
    <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Sign In
            </Button>
          </FormControl>


          {/* blockchain */}
          <Button
            onClick={async() => {account = await connectWallet()}}
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'>
            wallet connect
          </Button>

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
              placeholder='132'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            
            <Button
              onClick={() => {safeMint(account, document.getElementById('mintNum').value);
                console.log(account);
                console.log(document.getElementById('mintNum').value);}}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Mint
            </Button>
          </FormControl>

          {/* register price */}
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              register price
            </FormLabel>
            <Input
              id='rpTokenId'
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              placeholder='132'
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
              placeholder='1000000'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            
            <Button
              onClick={() => {registerPrice(document.getElementById('rpTokenId').value, document.getElementById('rpPrice').value)}}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              register price
            </Button>
          </FormControl>

          {/* register Jeonse */}
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              register Jeonse
            </FormLabel>
            <Input
              id='rjTokenId'
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              placeholder='132'
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
              placeholder='0x5d122a75EdA3281f074e585124C0722FCD799C3d'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            
            <Button
              onClick={() => {registerJeonse(document.getElementById('rjTokenId').value, document.getElementById('rjAddress').value);console.log(document.getElementById('rjTokenId').value); console.log(document.getElementById('rjAddress').value);}}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              register Jeonse
            </Button>
          </FormControl>

          {/* register Jeonip */}
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              register Jeonse
            </FormLabel>
            <Input
              id='rjiTokenId'
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              placeholder='132'
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
              placeholder='1939291942'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            
            <Button
              onClick={() => {registerJeonip(document.getElementById('rjiTokenId').value, document.getElementById('rjiAddress').value);
            console.log(document.getElementById('rjiTokenId').value);
            console.log(document.getElementById('rjiAddress').value);}}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              register Jeonip
            </Button>
          </FormControl>

          {/* register setOpenDoor */}
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
              placeholder='132'
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
              placeholder='0x5d122a75EdA3281f074e585124C0722FCD799C3d'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            
            <Button
              onClick={() => {setOpenDoor(document.getElementById('sodTokenId').value, document.getElementById('sodTime').value);}}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Set Open Door
            </Button>
          </FormControl>









          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </SimpleGrid>
    // </DefaultAuth>
  );
}

export default SignIn;
