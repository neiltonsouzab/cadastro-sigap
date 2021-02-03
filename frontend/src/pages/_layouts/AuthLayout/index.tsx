import React from 'react';

import { Container, FormSection, BackgroundSection } from './styles';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <FormSection>{children}</FormSection>

      <BackgroundSection />
    </Container>
  );
};

export default AuthLayout;
