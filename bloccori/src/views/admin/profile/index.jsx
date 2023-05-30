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

// Chakra imports
import { 
  Avatar,
  Box,
  Button,
  Link,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Grid,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import IconBox from "components/icons/IconBox";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import React, { useEffect, useState } from "react";
import { getOwnerOf, connectWallet, getPriceOf, getJeonseOf, getJeonipOf, get_open_door } from "../../../blockchaincontroller/blockcontrol";

import MiniStatistics from "components/card/MiniStatistics";
import PieCard from "views/admin/default/components/PieCard";
import Card from "components/card/Card.js";
import Matic from "assets/img/dashboards/matic.png";

import Loading from 'views/admin/profile/Loading';

import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";



export default function Overview() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const brandColor = useColorModeValue("green.500", "white");

  const [NFTs, setNFTs] = useState([])
  const [APICall, setAPICall] = useState(false);
  const [loading, setLoading] = useState(true);

  function Unix_timestamp(t){
    var date = new Date(t*1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth()+1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
  }
  
  const fetchNFTsForCollection = async () => {
      setLoading(true);
      let myWalletAddress;
      myWalletAddress = await connectWallet();
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "rygC0xsI-P_GcTM-KHaoWoPfX_d4R66y"
      const collection = "0xA38A6A7A72F18BA7a43B128c5C115A7904fbb0c4"
      const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        
        for (let i = 0; i < nfts.nfts.length; i++) {
          console.log("nft i:", i)
          const nft = nfts.nfts[i]
          let owner = await getOwnerOf(nft.id.tokenId);
          console.log(typeof owner);
          console.log(typeof myWalletAddress);

          let myWalletAddressString = myWalletAddress.toString().toLowerCase();
          let ownerString = owner.toString().toLowerCase();
          console.log(typeof owner);
          console.log(typeof myWalletAddress);
          console.log(ownerString);
          console.log(myWalletAddressString);
          
          let price = await getPriceOf(nft.id.tokenId);
          console.log(nft.id.tokenId);
          console.log(price);
          if(price != 0) {
            nft.metadata.price = price.toString() + " MATIC";
          } 

          let jeonse = await getJeonseOf(nft.id.tokenId);
          let jeonip = await getJeonipOf(nft.id.tokenId);
          let open_door = await get_open_door(nft.id.tokenId);
          nft.jeonse = jeonse;
          nft.jeonip = jeonip;
          nft.open_door = Unix_timestamp(open_door);
          nft.owner = ownerString;


          if (ownerString == myWalletAddressString) {
            console.log("succ");
            setNFTs(NFTs => [...NFTs, nft]);
          } else {
            console.log("fail ====");
            // setNFTs(NFTs => [...NFTs, nft]);
          }
        }
        console.log("NFTs in collection:", nfts)
        //setNFTs(nfts.nfts)
      } else {
        console.log("no nfts")
        document.getElementById("nftCollection").innerHTML = "No NFTs owned by this address";
      }
      setLoading(false);
      
  }
  let myWalletAddress = '';
  const getMyWallet = async () => {
    myWalletAddress = await connectWallet();
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          // startContent={
          //   <IconBox
          //     w='56px'
          //     h='56px'
          //     bg={boxBg}
          //     icon={
          //       <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
          //     }
          //   />
          // }
          growth='+3.8%'
          name='Earnings'
          value='193240 MATIC'
        />
        <MiniStatistics
          // startContent={
          //   <IconBox
          //     w='56px'
          //     h='56px'
          //     bg={boxBg}
          //     icon={
          //       <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
          //     }
          //   />
          // }
          growth='+1.4%'
          name='Spend this month'
          value='140000 MATIC'
        />
        {/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' /> */}
        <MiniStatistics
          startContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Matic} />
              </FormLabel>
            </Flex>
          }
          growth='+23%'
          name='Your balance'
          value='4308 MATIC'
        />
        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        /> */}
        <Link onClick={onOpen}>
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
                }
              />
            }
            notification={[3, 1, 1]}
            name='Total Projects'
            value='5'
          />
        </Link>
        <Modal isOpen={isOpen} size={'full'}onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Certificate of Registry Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <ComplexTable
                columnsData={columnsDataComplex}
                tableData={tableDataComplex}
              />
              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SimpleGrid>

      {useEffect(() => {
        if (!APICall) {
          fetchNFTsForCollection()
          getMyWallet()
        }
        setAPICall(true)
      })}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Yuri Jo'
          job='Designer'
          nfts='17'
          totalAsset='9.7k'
          following='3'
        />
        <Upload
          gridArea='1 / 2 / 2 / 4'
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>

      <Card>
        <Text
          fontWeight='bold'
          textAlign='start'
          fontSize='xl'>
          My NFTs
        </Text>
        {loading ? <Loading /> : null}
        <Grid id='nftCollection'>
          {
            NFTs.length && NFTs.map(nft => {
              
              console.log("haha");
              console.log(nft.id.tokenId);
              

              return (
                
                <HistoryItem
                  name={nft.title}
                  // author={nft.metadata.owner}
                  date={nft.metadata.attributes[2].value}
                  image={nft.media[0].gateway}
                  price={nft.metadata.price}
                  jeonse={nft.jeonse}
                  jeonip={nft.jeonip}
                  open_door={nft.open_door}
                  owner={nft.owner}
                  address={nft.metadata.address}
                  building={nft.metadata.attributes[0].value}
                  transaction={nft.metadata.attributes[1].value}
                  direction={nft.metadata.attributes[5].value}
                  loan={nft.metadata.attributes[6].value}
                />
              )
              
            })
          }
        </Grid>
      </Card>


      {/* <Grid
        mb='20px'
        gap={{ base: "20px", xl: "20px" }}>
        <PieCard />
      </Grid>

      <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        
        <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid> */}
    </Box>
  );
}
