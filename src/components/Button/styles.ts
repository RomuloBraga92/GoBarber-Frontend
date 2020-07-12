import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface DisabledProps {
  disabled?: boolean;
}

export const Container = styled.button<DisabledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  ${props =>
    props.disabled &&
    css`
      cursor: wait;
      background: ${shade(0.2, '#ff9000')};
    `}
`;
