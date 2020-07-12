import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
import Loading from '../Loading';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" disabled={loading} {...rest}>
    {loading ? (
      <Loading width={32} height={32} type="spinningBubbles" color="#312e38" />
    ) : (
      children
    )}
  </Container>
);

export default Button;
