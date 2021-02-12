import { extendTheme } from '@chakra-ui/react';

import { config } from './config';

const theme = extendTheme({
  ...config,
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme;
