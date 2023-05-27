import React from "react";
// Chakra imports
import { Flex, Icon, Image, Text, Link, useColorModeValue, Button, Grid, GridItem,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import { FaEthereum } from "react-icons/fa";

import TotalSpent from "views/admin/default/components/TotalSpent";

export default function NFT(props) {
  const { image, name, author, date, price } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("green.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "green.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card
      _hover={bgItem}
      bg='transparent'
      boxShadow='unset'
      px='24px'
      py='21px'
      transition='0.2s linear'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Flex position='relative' align='center'>
          <Image src={image} w='66px' h='66px' borderRadius='20px' me='16px' />
          <Flex
            direction='column'
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Link onClick={onOpen}>
              <Text
                color={textColor}
                fontSize={{
                  base: "md",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
            </Link>
            
            <Text
              color='secondaryGray.600'
              fontSize={{
                base: "sm",
              }}
              fontWeight='400'
              me='14px'>
              {author}
            </Text>
          </Flex>
          <Modal isOpen={isOpen} size={'full'}onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                  <Card>
                    <Grid 
                      h='200px'
                      templateRows='repeat(2, 1fr)'
                      templateColumns='repeat(5, 1fr)'
                      >
                      <GridItem rowSpan={2} colSpan={1}>
                        <Image src={image} w='200px' h='200px' borderRadius='20px' me='16px' />
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Text fontSize='25px' fontWeight='700'>
                          Owner : 
                          <Text fontSize='20px' fontWeight='400'>{author}</Text>
                        </Text>
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Text fontSize='25px' fontWeight='700'>
                          Price : 
                          <Text fontSize='20px' fontWeight='400'>{price}</Text>
                        </Text>
                      </GridItem>
                    </Grid>
                  </Card>
                  
                  <TotalSpent
                    currentPrice={price}
                    lineChartData = {[
                      {
                        name: "Revenue",
                        data: [50, 64, 48, 66, 49, 68],
                      },
                      {
                        name: "Profit",
                        data: [10, 20, 30, 40, 50, 60],
                      },
                    ]}
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

          <Flex
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align='center'>
            <Icon as={FaEthereum} color={textColor} width='9px' me='7px' />
            <Text fontWeight='700' fontSize='md' color={textColor}>
              {price}
            </Text>
          </Flex>
          <Text ms='auto' fontWeight='700' fontSize='sm' color={textColorDate}>
            {date}
          </Text>
          
        </Flex>
      </Flex>
    </Card>
  );
}
