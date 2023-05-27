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

import React, { useEffect, useState, } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("green.500", "white");

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection]=useState(false)
  const [APICall, setAPICall] = useState(false);
  

  // const fetchNFTs = async() => {
  //   let nfts; 
  //   console.log("fetching nfts");
  //   const api_key = "rygC0xsI-P_GcTM-KHaoWoPfX_d4R66y"
  //   const collection = "0x54086ec43fc23B1aA2fC50fD2F1CEEcA0a380447"
  //   const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    
  //   var requestOptions = {
  //       method: 'GET'
  //     };
    
  //   if (!collection.length) {
    
  //     const fetchURL = `${baseURL}?owner=${wallet}`;

  //     nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
  //   } else {
  //     console.log("fetching nfts for collection owned by address")
  //     const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
  //     nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
  //   }

  //   if (nfts) {
  //     console.log("nfts:", nfts)
  //     setNFTs(nfts.ownedNfts)
  //   }
  // }

  const fetchNFTsForCollection = async () => {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "rygC0xsI-P_GcTM-KHaoWoPfX_d4R66y"
      const collection = "0xDBcA65E7B262fFD6e56a46E2f708D3b7a3bdc5bF"
      const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      } else {
        console.log("no nfts")
        document.getElementById("nftCollection").innerHTML = "No NFTs owned by this address";
      }
  }

  return (
    
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {useEffect(() => {
        if (!APICall) {
          fetchNFTsForCollection()
        }
        setAPICall(true)
      })}
      
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Card>
            <Text
              fontWeight='bold'
              textAlign='start'
              fontSize='xl'>
              My NFTs
            </Text>
            
            <Grid id='nftCollection'>
              {
                NFTs.length && NFTs.map(nft => {
                  return (
                    <HistoryItem
                      name={nft.title}
                      author={nft.metadata.owner}
                      date={nft.metadata.attributes[2].value}
                      image={nft.media[0].gateway}
                      price={nft.metadata.price}
                    />
                  
                  )
                })
              }
            </Grid>
            
          </Card>
        </Flex>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          {/* <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card> */}
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button colorScheme='green'>See all</Button>
            </Flex>

            <HistoryItem
              name='JeonSe #931 : Seyeon Park View'
              author='Young Ko'
              date='83㎡'
              image={Nft5}
              price='680124.78 MATIC'
            />
            <HistoryItem
              name='JeonSe #987 : Detatched House'
              author='Yuri Jo'
              date='295㎡'
              image={Nft1}
              price='1395127.76 MATIC'
            />
            <HistoryItem
              name='JeonSe #562 : Seyeon Park View'
              author='Byeonguk Lee'
              date='83㎡'
              image={Nft2}
              price='680124.78 MATIC'
            />
            <HistoryItem
              name='JeonSe #610 : Seyeon Park View'
              author='Seungchan Lee'
              date='83㎡'
              image={Nft4}
              price='680124.78 MATIC'
            />
            <HistoryItem
              name='JeonSe #953 : The Hill House - Building 102'
              author='Minseo Lim'
              date='42.56㎡'
              image={Nft3}
              price='408946.8 MATIC'
            />
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}
