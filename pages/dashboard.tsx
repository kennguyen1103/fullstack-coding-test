import { useState, useEffect } from "react";
import { Grid, Box, Flex } from "@chakra-ui/layout";
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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { BlogsProvider } from "hooks/use-blog.js";
import { useBlogs } from "hooks/use-blog";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { create } from "node:domain";

import withAuthAdmin from "hoc/withAuthAdmin";

const Dashboard = () => {
  const { blogs, deleteBlog, updateBlog, createBlog } = useBlogs();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [current, setCurrent] = useState(null);
  const [newOne, setNewOne] = useState({ title: "", content: "", url: "" });

  const onClose = () => setIsOpen(false);

  const onCloseCreate = () => setIsOpenCreate(false);

  const onOpen = (blog) => {
    setCurrent(blog);
    setIsOpen(true);
  };

  const onDelete = () => {
    deleteBlog(current.id);
    setIsOpen(false);
  };

  const onUpdate = () => {
    updateBlog(current);
    setIsOpen(false);
  };

  const handleChangeContent = (content) => {
    setCurrent({ ...current, content });
  };

  const handleChangeContentCreate = (content) => {
    setNewOne({ ...newOne, content });
  };

  const handleChangeTitle = (e) => {
    setNewOne({ ...newOne, title: e.target.value });
  };

  const handleChangeUrl = (e) => {
    setNewOne({ ...newOne, url: e.target.value });
  };

  const onCreate = () => {
    if (newOne.title && newOne.content) {
      createBlog(newOne);
      setIsOpenCreate(false);
    } else alert("Please enter title and content");
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Button colorScheme="blue" mr={3} onClick={() => setIsOpenCreate(true)}>
          Create new blog
        </Button>
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
          <ModalBody>
            <SunEditor setContents={current?.content} onChange={handleChangeContent} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" mr={3} onClick={onUpdate}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex width="full" align="center" justifyContent="center" direction="column">
              <Box>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" name="name" value={newOne.title} onChange={handleChangeTitle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <SunEditor setContents={newOne.content} onChange={handleChangeContentCreate} />
                </FormControl>

                <FormControl>
                  <FormLabel>Image Url</FormLabel>
                  <Input type="text" name="url" value={newOne.url} onChange={handleChangeUrl} />
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseCreate}>
              Close
            </Button>
            <Button colorScheme="green" mr={3} onClick={onCreate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DashboardWrapper = () => {
  return (
    <BlogsProvider>
      <Dashboard></Dashboard>
    </BlogsProvider>
  );
};

export default withAuthAdmin(DashboardWrapper);
