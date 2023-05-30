import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineCloudUpload,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import DataInput from "views/admin/dataInput";
// import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "NFT Gallery",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
      name: "Mint & Register",
      layout: "/admin",
      path: "/input",
      icon: <Icon as={MdOutlineCloudUpload} width='20px' height='20px' color='inherit' />,
      component: DataInput,
  },
  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
