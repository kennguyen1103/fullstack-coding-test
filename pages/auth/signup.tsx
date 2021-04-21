import { useAuth } from "hooks/use-auth";
import { useRouter } from "next/router";

import { Box, Flex } from "@chakra-ui/layout";
import { Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Signup = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, name, dob } = event.target.elements;

    const { user, error } = await auth.signup(email.value, password.value, name.value, dob.value);

    if (user) router.push("/");
    if (error) alert(error);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Sign up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSignUp}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" name="email" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" name="password" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>DOB</FormLabel>
              <Input type="date" name="dob" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
