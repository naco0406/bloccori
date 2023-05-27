// Chakra imports
// Chakra imports
import {
  Icon,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

function circumference(r) {
  return parseFloat(r) * 2.0 * Math.PI;
}


export default function Default(props) {
  const { startContent, endContent, name, growth, notification, value } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const exchange = Math.round(circumference(value)*0.92/1000);

  return (
    <Card py='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "xl",
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                ${exchange}K USD &nbsp;
              </Text>
              
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
            </Flex>
          ) : null}
          {notification ? (
            <Flex align='center'>
              <Icon w='12px' h='12px' me='5px' color = 'green.500' as = {MdCheckCircle}/>
              <Text color='green.500' fontSize='xs' fontWeight='400'>
                {notification[0]} &nbsp;
              </Text>
              
              <Icon w='12px' h='12px' me='5px' color = 'red.500' as = {MdCancel}/>
              <Text color='red.500' fontSize='xs' fontWeight='400'>
                 {notification[1]} &nbsp;
              </Text>
              
              <Icon w='12px' h='12px' me='5px' color = 'orange.500' as = {MdOutlineError}/>
              <Text color='orange.500' fontSize='xs' fontWeight='400'>
                 {notification[2]}
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
