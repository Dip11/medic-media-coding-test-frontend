import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  type InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

/**
 * `PasswordField` コンポーネントは、パスワード入力フィールドを提供し、ユーザーがパスワードの表示/非表示を切り替えることができる機能を備えています。
 *
 * このコンポーネントは `Input` フィールドを拡張しており、パスワードの表示状態をトグルするボタンを含んでいます。
 * ユーザーがトグルボタンをクリックすると、パスワードが表示されたり非表示になったりします。
 *
 * @param props - 親コンポーネントから受け取る `Input` のプロパティ。
 * @param ref - フォワード参照として渡される `ref` オブジェクト。
 * @returns `JSX.Element` - パスワードフィールドをレンダリングする JSX 要素。
 */
export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    // `useDisclosure` フックを使用してパスワードの表示状態を管理します。
    const { isOpen, onToggle } = useDisclosure();

    // パスワード入力フィールドへの参照を作成します。
    const inputRef = useRef<HTMLInputElement>(null);

    // `inputRef` と親コンポーネントから受け取った `ref` をマージします。
    const mergeRef = useMergeRefs(inputRef, ref);

    /**
     * パスワード表示/非表示を切り替えるボタンがクリックされたときのハンドラ。
     * パスワードフィールドの表示状態をトグルし、フィールドにフォーカスを戻します。
     */
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl>
        <FormLabel htmlFor="password">パスワード</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
