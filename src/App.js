import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import BrowserRouter and Route
import Home from './Component/Home';
import MultiStepForm from './Component/MultiStepForm';
import HotelForm from './Component/HotelForm';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Switch> {/* Use Switch to render only the first matching route */}
            <Route path="/" exact component={Home} />
            <Route path="/multistep" component={MultiStepForm} />
            <Route path="/hotel" component={HotelForm} />
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
