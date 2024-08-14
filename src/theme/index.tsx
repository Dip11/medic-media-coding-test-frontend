import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { accordionTheme } from './accordingComponent';

const theme = extendTheme({
  colors: {
    primary: baseTheme.colors.blue[900],
    primary_disabled: baseTheme.colors.green[100],
    primary_lighter: baseTheme.colors.blue[400],
    primary_lighter_disabled: baseTheme.colors.green[100],
    primary_darker: baseTheme.colors.blue[800],
    reverse_primary: baseTheme.colors.white,
    reverse_disabled: baseTheme.colors.white,
    reverse_primary_lighter: baseTheme.colors.blue[200],
    secondary: baseTheme.colors.gray[600],
    secondary_darker: baseTheme.colors.gray[800],
    reverse_secondary: baseTheme.colors.white,
    primary_success: baseTheme.colors.green[600],
    reverse_primary_success: baseTheme.colors.white,
    primary_success_disabled: baseTheme.colors.green[100],
    primary_success_darker: baseTheme.colors.green[700],
    reverse_primary_success_darkar: baseTheme.colors.white,
  },

  styles: {
    global: () => ({
      body: {},
    }),
  },
  components: { Accordion: accordionTheme },
});

export default theme;
