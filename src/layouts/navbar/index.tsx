import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  type FlexProps,
  Image,
  Spacer,
  Button,
} from "@chakra-ui/react";
import logo from "assets/h_logo.svg";
import { useSignOut } from "hooks/auth/useSignOut";
import { AuthUser } from "interfaces/auth";
import { useAuthUser } from "hooks/auth/useAuthUser";

interface MobileProps extends FlexProps {
  onOpen?: () => unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar = ({ onOpen, ...rest }: MobileProps): JSX.Element => {
  const signOut = useSignOut();
  const authUser: NullOrUndefined<AuthUser> = useAuthUser();

  // const onProfileClick = () => {};
  const onSignOut = () => {
    signOut();
  };

  return (
    <Flex height="20">
      <Box p="4">
        <Image height="50px" objectFit="cover" src={logo} alt="Logo" />{" "}
      </Box>
      <Spacer />
      <Box p="4">
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <HStack>
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{authUser?.firstName}</Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <Button onClick={onSignOut}> サインアウト</Button>
              </Box>
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navbar;
