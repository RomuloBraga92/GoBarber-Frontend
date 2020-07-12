import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;

      svg {
        color: #999591;
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export const Content = styled.div`
  margin: -180px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const FadeProfile = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${FadeProfile} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      text-align: left;
      margin-bottom: 16px;
      font-size: 20px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  > a {
    color: #ff9000;
    margin-top: 24px;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#FF9000')};
    }
  }
`;

export const AvatarProfile = styled.div`
  align-self: center;
  margin-bottom: 24px;
  position: relative;
  width: 186px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  label {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #ff9000;
    border: 0;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    transition: background-color 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
  }
`;
