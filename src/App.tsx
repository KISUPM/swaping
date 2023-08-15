import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import ItemField from "./Components/ItemField";

function App() {
  return (
    <Box
      userSelect={"none"}
      w="100vw"
      minH="100dvh"
      p="0.25rem"
      bg="#232323"
      color="#fff"
    >
      <ItemField />
    </Box>
  );
}

export default App;
