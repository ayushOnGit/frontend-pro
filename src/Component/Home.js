import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

const Home = () => {
  const history = useHistory();

  const handleNavigate = (path) => {
    history.push(path);
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor="#D6A2E8" // Light purple
    >
      <h1>Welcome to Home Page!</h1>
      <p>Please select a component to view.</p>

      <Button
        onClick={() => handleNavigate('/multistep')}
        colorScheme="green" // Light green
        mt={4}
      >
       Activities page
      </Button>
      <Button
        onClick={() => handleNavigate('/hotel')}
        colorScheme="purple" // Light purple
        mt={4}
      >
        Open HotelForm
      </Button>
    </Flex>
  );
};

export default Home;
