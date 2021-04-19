import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    callChangeValue(newvalue) {
      changeValue(newvalue);
    },
  }));

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <Heading as="h1" size="4xl" maxW="100vw" isTruncated>
      {value}
    </Heading>
  );
});

export default DynamicText;
