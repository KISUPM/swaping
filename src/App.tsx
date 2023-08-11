import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import ItemField from "./Components/ItemField";

function App() {
  return (
    <Box userSelect={"none"}>
      <ItemField />
    </Box>
  );
}

export default App;
