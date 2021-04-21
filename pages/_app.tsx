//require("dotenv").config();

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { globalTheme } from "../styles/global.theme";

import { ProvideAuth } from "hooks/use-auth.js";

const theme = extendTheme(globalTheme);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  );
};

export default MyApp;
