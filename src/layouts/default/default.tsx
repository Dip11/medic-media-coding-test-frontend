// import { useState } from 'react';
// import { Box, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
// import Sidebar from '../sidebar/product-entry';
// import Navbar from '../navbar';
// import { Outlet } from 'react-router-dom';
// import { BaseComponent } from 'interfaces/component';

// const smVariant = { navigation: 'drawer', navigationButton: true };
// const mdVariant = { navigation: 'sidebar', navigationButton: false };

// const DefaultLayout = (): BaseComponent => {
//   // const [isSidebarOpen, setSidebarOpen] = useState(false);
//   // const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

//   // const toggleSidebar = (): void => {
//   //   setSidebarOpen(!isSidebarOpen);
//   // };

//   return (
//     <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
//       {/* <Sidebar
//         variant={(variants?.navigation as 'sidebar') || 'drawer'}
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//       /> */}
//       {/* <Navbar
//         onOpen={() => {
//           setSidebarOpen(true);
//         }}
//       /> */}
//       <Box ml={{ base: 0, md: '28%' }} p="4">
//         <Box>
//           {/* <Card> */}
//           <Outlet />
//           {/* </Card> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DefaultLayout;
