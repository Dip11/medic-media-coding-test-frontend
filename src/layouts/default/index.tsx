import { Box, Card, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { BaseComponent } from 'interfaces/component';
import Navbar from 'layouts/navbar';

const DefaultLayout = (): BaseComponent => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Box>
        <Card>
          asddasdsa
        <Outlet />
        </Card>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
