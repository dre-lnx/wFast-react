import './App.css';

import { ChakraProvider } from "@chakra-ui/react";
import TestComponent from './components/TestComponent';



function App() {
  return (
    <ChakraProvider>
      <TestComponent></TestComponent>
    </ChakraProvider>
  );
}

export default App;
