import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Image,
  Text,
} from '@chakra-ui/react';
import logo from 'assets/h_logo.svg';
import { PasswordField } from 'components/atoms/password-field';
import { useSignIn } from 'hooks/auth/useSignIn';
import { type AuthUser } from 'interfaces/auth';
import { type BaseComponent } from 'interfaces/component';
import { useEffect, type FormEventHandler } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import * as userLocalStorage from 'utils/user.localstore';

export const Login = (): BaseComponent => {
  const navigate = useNavigate();
  const { mutateFn: signIn, isLoading: isLoading, error } = useSignIn();

  useEffect(() => {
    try {
      const authUser: NullOrUndefined<AuthUser> = userLocalStorage.getUser();
      if (authUser) {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSignIn: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email === 'string' && typeof password === 'string') {
      signIn({
        email,
        password,
      });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <HStack spacing="1" justify="center">
            <Image objectFit="cover" src={logo} alt="" />
          </HStack>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
            メールアドレスとパスワードを入力してください
            </Heading>
          </Stack>
        </Stack>
        <Form onSubmit={onSignIn}>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">メール</FormLabel>
                  <Input id="email" name="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              {error && (
                <Stack>
                  <Text fontSize="sm" color={'primary'} align={'center'}>
                    {error?.message}
                  </Text>
                </Stack>
              )}
              <Stack spacing="6" mt={10}>
                <Button
                  isLoading={isLoading}
                  loadingText="Signing In"
                  bg="primary"
                  color="reverse_primary"
                  _hover={{
                    color: 'primary',
                    bg: 'reverse_primary',
                    border: '1px',
                    borderRadius: 'md',
                    borderColor: 'primary',
                  }}
                  variant="solid"
                  type="submit"
                >
                  サインイン
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Form>
      </Stack>
    </Container>
  );
};
