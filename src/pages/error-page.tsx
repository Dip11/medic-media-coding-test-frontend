import { Heading, VStack, Box } from "@chakra-ui/react";
import { type BaseComponent } from "interfaces/component";
import { NavLink } from "react-router-dom";

const ErrorPage = (): BaseComponent => {
  return (
    <VStack spacing="10" p={10} align="center">
      <Heading fontSize="5xl" fontWeight="medium">
        ページが見つかりません。
      </Heading>
      <NavLink to="/">
        <Box _hover={{ cursor: "pointer", color: "blue.400" }} color="blue.600">
          ホーム ページに戻ってください。
        </Box>
      </NavLink>
    </VStack>
  );
};

export default ErrorPage;
