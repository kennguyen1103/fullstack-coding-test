import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { globalTheme } from "../styles/global.theme";

const theme = extendTheme(globalTheme);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
