import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

import { ReactComponent as BloccoriLogo } from 'assets/logo_main.svg';


export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("green.700", "white");

  return (
    <Flex align='center' direction='column'>
      <BloccoriLogo h='26px' w='175px' my='32px' paddingLeft = '20px'/>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
