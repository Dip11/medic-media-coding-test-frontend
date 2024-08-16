import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { API_URL } from "constants/apiUrls";
import { BaseComponent } from "interfaces/component";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiPostMethod } from "utils/axios/api-methods";
import logo from "assets/h_logo.svg";

/**
 * `UserRegistrationFormInput` は、ユーザー登録フォームの入力フィールドを定義します。
 * - `firstName`: ユーザーの名前。
 * - `lastName`: ユーザーの苗字。
 * - `email`: ユーザーのメールアドレス。
 * - `password`: ユーザーのパスワード。
 */
type UserRegistrationFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/**
 * `RegisterNewUserForm` コンポーネントは、新規ユーザーを登録するためのフォームを提供します。
 *
 * このフォームには、ユーザー名、苗字、メールアドレス、パスワードの入力フィールドが含まれており、
 * ユーザーがフォームを送信すると、APIにリクエストが送信され、ユーザー登録が試行されます。
 * 成功メッセージやエラーメッセージが表示され、ユーザーの操作が反映されます。
 *
 * @returns `BaseComponent` - ユーザー登録フォームをレンダリングするコンポーネント。
 */

export const RegisterNewUserForm = (): BaseComponent => {
  const navigate = useNavigate(); // ルーティング用のナビゲート関数を取得します。

  // React Hook Formを使用してフォームの状態とバリデーションを管理します。
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationFormInput>();

  // 状態フックを使用して、成功メッセージ、エラーメッセージ、およびロード状態を管理します。
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * `onSubmit` 関数は、フォームが送信されたときに呼び出されます。
   * 入力データを使用してAPIリクエストを送信し、ユーザー登録を試行します。
   * 成功または失敗した場合に応じて、適切なメッセージが表示されます。
   *
   * @param data - ユーザーが入力したデータを含むオブジェクト。
   */
  const onSubmit: SubmitHandler<UserRegistrationFormInput> = async (data) => {
    setSuccessMessage(""); // 成功メッセージをリセット
    setErrorMessage(""); // エラーメッセージをリセット
    setIsLoading(true); // ロード状態を有効にする
    try {
      // APIにリクエストを送信してユーザーを登録します。
      const newUserRegistrationData = await apiPostMethod(
        API_URL.USER_REGISTRATION,
        data
      );
      
      // 登録が成功した場合、成功メッセージを表示します。
      if (newUserRegistrationData) {
        setSuccessMessage("新規ユーザーが正常に登録されました。");
      }
    } catch (error: any) {
      // エラーハンドリング: エラーメッセージを設定します。
      console.log(error);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false); // ロード状態を無効にする
    }
  };

  return (
    <Card>
      <CardHeader>
        <Box p="4" marginBottom={5}>
          <Center>
            <Image height="50px" objectFit="cover" src={logo} alt="Logo" />{" "}
          </Center>
        </Box>
        <Center marginBottom={5}>
          <Text>
            すでにアカウントをお持ちの場合は、
            <Link color="blue.500" onClick={() => navigate("/login")}>
              こちらからログインしてください。
            </Link>
          </Text>
        </Center>
        <Heading>ユーザー登録フォーム</Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl marginTop={3}>
              <FormLabel>名前</FormLabel>
              <Input
                type="text"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && <Box color={"red"}>名前は必須です。</Box>}
            </FormControl>
            <FormControl marginTop={3}>
              <FormLabel>苗字</FormLabel>
              <Input type="text" {...register("lastName")} />
            </FormControl>
            <FormControl marginTop={3}>
              <FormLabel>メール</FormLabel>
              <Input type="email" {...register("email", { required: true })} />
              {errors.email && <Box color={"red"}>メールは必須です。</Box>}
            </FormControl>
            <FormControl marginTop={3}>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="パスワード"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Box color={"red"}>パスワードは必須です。</Box>
              )}
            </FormControl>
            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="blue"
              marginTop={5}
            >
              登録
            </Button>
          </form>
        </Stack>
      </CardBody>
    </Card>
  );
};
