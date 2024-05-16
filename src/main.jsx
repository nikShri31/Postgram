import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css' 
import { mode } from "@chakra-ui/theme-tools"; 
import { ChakraProvider } from '@chakra-ui/react' 
import { extendTheme } from "@chakra-ui/react"; 
import { BrowserRouter } from "react-router-dom"; 




const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.800","#000")(props),
      color: mode("gray.400", "whiteAlpha.900")(props),

    },

  })
};

// config 
// extendTheme
// theme as props 


const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });


const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
