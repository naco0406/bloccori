import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#2C7538",
      200: "#2C7538",
      300: "#64AB4D",
      400: "#2C7538",
      500: "#422AFB",
      600: "#26602C",
      700: "#153517",
      800: "#265E4B",
      900: "#1A3F32",
    },
    brandScheme: {
      100: "#2C7538",
      200: "#2C7538",
      300: "#64AB4D",
      400: "#2C7538",
      500: "#422AFB",
      600: "#26602C",
      700: "#153517",
      800: "#265E4B",
      900: "#1A3F32",
    },
    brandTabs: {
      100: "#2C7538",
      200: "#2C7538",
      300: "#64AB4D",
      400: "#2C7538",
      500: "#422AFB",
      600: "#26602C",
      700: "#153517",
      800: "#265E4B",
      900: "#1A3F32",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#2C7538",
      200: "#2C7538",
      300: "#64AB4D",
      400: "#2C7538",
      500: "#422AFB",
      600: "#26602C",
      700: "#153517",
      800: "#265E4B",
      900: "#1A3F32",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
