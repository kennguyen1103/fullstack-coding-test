import Head from "next/head";
import DynamicText from "../components/DynamicText";
import { Box, Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";

const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" justifyContent="center" alignItems="center" minH="100vh">
        <Flex flex="1" direction="column" justifyContent="center" alignItems="center" padding="5rem 0">
          <Box>
            <DynamicText />
          </Box>
          <Box>
            <Input size="md" onChange={onChange} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
