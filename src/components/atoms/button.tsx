import { Button as ChakraButton } from '@chakra-ui/react';
import { type BaseComponent } from 'interfaces/component';
import {
  useState,
  type ReactNode,
  ReactElement,
  JSXElementConstructor,
} from 'react';

type TSize = 'sm' | 'md' | 'lg' | 'xs';

interface IButtonProps {
  type: 'primary' | 'secondary' | 'primary_success' | 'other';
  bg?: string;
  size?: TSize;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  leftIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  rightIcon?:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
  onClick?: (e: any) => void;
  children: ReactNode;
}

export const Button = (props: IButtonProps): BaseComponent => {
  const {
    type,
    bg,
    color,
    children,
    size,
    width,
    height,
    fontSize,
    isDisabled,
    isLoading,
    leftIcon,
    rightIcon,
    onClick,
  } = props;

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [buttonWidth, setButtonWidth] = useState<string>(width ?? '100%');

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [buttonSize, setButtonSize] = useState<TSize>(size ?? 'md');

  return (
    <>
      {type === 'primary' && (
        <ChakraButton
          w="100%"
          bg="primary"
          color="reverse_primary"
          _hover={{
            color: 'reverse_primary',
            bg: 'primary_darker',
            border: '1px',
            borderRadius: 'md',
            borderColor: 'primary',
          }}
          size={size ?? 'md'}
          width={buttonWidth}
          height={height}
          fontSize={fontSize}
          isDisabled={isDisabled}
          isLoading={isLoading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onClick={onClick}
        >
          {children}
        </ChakraButton>
      )}
      {type === 'secondary' && (
        <ChakraButton
          w="100%"
          bg="secondary"
          color="reverse_secondary"
          _hover={{
            color: 'reverse_secondary',
            bg: 'secondary_darker',
            border: '1px',
            borderRadius: 'md',
            borderColor: 'secondary',
          }}
          size={size ?? 'md'}
          width={buttonWidth}
          height={height}
          fontSize={fontSize}
          isDisabled={isDisabled}
          isLoading={isLoading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onClick={onClick}
        >
          {children}
        </ChakraButton>
      )}
      {type === 'primary_success' && (
        <ChakraButton
          w="100%"
          bg="primary_success_darker"
          color="reverse_primary_success_darkar"
          _hover={{
            color: 'reverse_primary_success_darkar',
            bg: 'primary_success_darkar',
            border: '1px',
            borderRadius: 'md',
            borderColor: 'primary_success_darkar',
          }}
          size={size ?? 'md'}
          width={buttonWidth}
          height={height}
          fontSize={fontSize}
          isDisabled={isDisabled}
          isLoading={isLoading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onClick={onClick}
        >
          {children}
        </ChakraButton>
      )}
      {type === 'other' && (
        <ChakraButton
          w="100%"
          bg={bg}
          color={color}
          _hover={{
            color: `reverse_${bg}`,
            bg: `${bg}_darker`,
            border: '1px',
            borderRadius: 'md',
            borderColor: `${color}`,
          }}
          size={size ?? 'md'}
          width={buttonWidth}
          height={height}
          fontSize={fontSize}
          isDisabled={isDisabled}
          isLoading={isLoading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onClick={onClick}
        >
          {children}
        </ChakraButton>
      )}
    </>
  );
};
