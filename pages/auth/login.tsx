import { useAuth } from "hooks/use-auth";
import { useRouter } from "next/router";

import { Box, Flex } from "@chakra-ui/layout";
import { Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const { user, error } = await auth.signin(email.value, password.value);

    if (user) router.push("/");
    if (error) alert(error);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" name="email" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" name="password" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
