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
import { getOwnerOf, connectWallet } from "../../../blockchaincontroller/blockcontrol";

import MiniStatistics from "components/card/MiniStatistics";
import PieCard from "views/admin/default/components/PieCard";
import Card from "components/card/Card.js";
import Matic from "assets/img/dashboards/matic.png";

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
  const fetchNFTsForCollection = async () => {
      let myWalletAddress;
      myWalletAddress = await connectWallet();
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "rygC0xsI-P_GcTM-KHaoWoPfX_d4R66y"
      const collection = "0xDBcA65E7B262fFD6e56a46E2f708D3b7a3bdc5bF"
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

        <Grid id='nftCollection'>
          {
            NFTs.length && NFTs.map(nft => {
              
              console.log("haha");
              console.log(nft.id.tokenId);

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
