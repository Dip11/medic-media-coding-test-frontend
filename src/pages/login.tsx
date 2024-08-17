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
  Center,
} from "@chakra-ui/react";
import logo from "assets/h_logo.svg";
import { PasswordField } from "components/atoms/password-field";
import { useSignIn } from "hooks/auth/useSignIn";
import { type AuthUser } from "interfaces/auth";
import { type BaseComponent } from "interfaces/component";
import { useEffect, type FormEventHandler } from "react";
import { Form, useNavigate } from "react-router-dom";
import * as userLocalStorage from "utils/user.localstore";

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

  /**
   * サインインフォームの送信を処理するイベントハンドラー。
   *
   * この関数は、フォームが送信されたときに呼び出され、デフォルトのフォーム送信動作を防止します。
   * 次に、`FormData` を使用してフォームデータを取得し、ユーザーが入力したメールアドレスと
   * パスワードを抽出します。これらのデータが文字列として有効であれば、`signIn` 関数を呼び出して
   * 認証を開始します。
   *
   * @param form - フォーム送信イベントの `FormEvent` オブジェクト。
   */
  const onSignIn: FormEventHandler<HTMLFormElement> = (form) => {
    // デフォルトのフォーム送信動作を防止します。
    form.preventDefault();

    // フォームから送信されたデータを取得します。
    const formData = new FormData(form.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // メールとパスワードが有効な文字列であることを確認します。
    if (typeof email === "string" && typeof password === "string") {
      // サインイン関数を呼び出して認証を開始します。
      signIn({
        email,
        password,
      });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <HStack spacing="1" justify="center">
            <Image objectFit="cover" src={logo} alt="" />
          </HStack>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              メールアドレスとパスワードを入力してください
            </Heading>
          </Stack>
        </Stack>
        <Form onSubmit={onSignIn}>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
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
                  <Text fontSize="sm" color={"red"} align={"center"}>
                    {error?.message}
                  </Text>
                </Stack>
              )}
              <Stack spacing="6" mt={10}>
                <Button
                  isLoading={isLoading}
                  loadingText="サインイン中"
                  bg="primary"
                  color="reverse_primary"
                  _hover={{
                    color: "primary",
                    bg: "reverse_primary",
                    border: "1px",
                    borderRadius: "md",
                    borderColor: "primary",
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
        <Center onClick={() => navigate(`/register`)} cursor={'pointer'} color={'red'}>
          新しいユーザーとして登録</Center>
      </Stack>
    </Container>
  );
};
