import { accordionAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({});

// Defining a custom variant called outline
const outline = definePartsStyle(() => {
  return {
    container: {},
    panel: {
      _hover: {
        bg: 'primary',
        color: 'reverse_primary',
      },
    },
    button: {
      _hover: {
        bg: 'primary',
        color: 'reverse_primary',
      },
      _focus: {},
      // fontFamily: 'mono',
      fontSize: '15px',
    },
  };
});

const variants = {
  outline,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
});
