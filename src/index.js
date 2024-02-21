import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import Route instead of Routes
import MultiStepForm from './Component/MultiStepForm';
import HotelForm from './Component/HotelForm';

ReactDOM.render(
  <ChakraProvider>
   <App/>
  </ChakraProvider>,
  document.getElementById('root')
);
