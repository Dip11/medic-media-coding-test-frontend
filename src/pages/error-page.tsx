import { Heading, VStack, Box } from '@chakra-ui/react';
import { type BaseComponent } from 'interfaces/component';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const ErrorPage = (): BaseComponent => {
  const { t } = useTranslation();

  return (
    <VStack spacing="10" p={10} align="center">
      <Heading fontSize="5xl" fontWeight="medium">
        {t('error_page.heading1')}
      </Heading>
      <NavLink to="/">
        <Box _hover={{ cursor: 'pointer', color: 'blue.400' }} color="blue.600">
          {t('error_page.home_page')}{' '}
        </Box>
      </NavLink>
    </VStack>
  );
};

export default ErrorPage;
