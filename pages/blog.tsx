import { useState, useEffect } from "react";
import { db } from "loaders/firebase";

import { Grid, Box } from "@chakra-ui/layout";
import {
  Heading,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { BlogsProvider } from "hooks/use-blog.js";
import { useBlogs } from "hooks/use-blog";

const BlogWrapper = () => {
  return (
    <BlogsProvider>
      <Blog></Blog>
    </BlogsProvider>
  );
};

const Blog = () => {
  const { blogs } = useBlogs();
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const onClose = () => setIsOpen(false);

  const onOpen = (blog) => {
    setCurrent(blog);
    setIsOpen(true);
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => onOpen(blog)}>
                <Box m="5" as="a">
                  <Heading m="5" mb="0" as="h4" size="md">
                    {blog.title}
                  </Heading>
                  <Image src={blog.url} alt={blog.title} />
                </Box>
              </Box>
            );
          })}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{current?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{current?.content}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogWrapper;
