import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const FadeDashboard = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimationContainer = styled.div`
  animation: ${FadeDashboard} 1s;
`;

export const Header = styled.header`
  background: #28262e;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  button {
    border: 0;
    background: transparent;
    margin-left: auto;
  }

  svg {
    color: #999591;
    font-size: 35px;
    padding: 5px 5px;
    border: 1px solid #999591;
    border-radius: 8px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 15px;
    display: flex;
    flex-direction: column;

    strong {
      color: #f4ede8;
    }

    p {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;

  display: flex;
`;

const AppearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationSchedule = styled.div`
  margin-right: 120px;
  flex: 1;
  animation: ${AppearFromLeft} 1s;

  h1 {
    font-size: 30px;
    color: #f4ede8;
  }

  p {
    margin-top: 6px;
    display: flex;
    align-items: center;

    span {
      color: #ff9000;
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      margin-left: 8px;
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;
export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-weight: 400;
    font-size: 20px;
  }

  div {
    background: #3e3b47;
    width: 95%;
    display: flex;
    align-items: center;
    margin-top: 24px;
    padding: 16px 24px;
    border-radius: 8px;
    position: relative;
    transition: margin-left 0.3s;

    &:hover {
      margin-left: 15px;
    }

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 80%;
      background: #ff9000;
      left: 0;
      top: 10%;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    strong {
      color: #f4ede8;
      margin-left: 14px;
      font-size: 20px;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;

      svg {
        color: #ff9000;
        margin: 0 8px;
      }
    }
  }
`;

export const AnimationSection = styled.section`
  animation: ${AppearFromLeft} 1s;
  margin-top: 40px;

  & + section {
    margin-top: 20px;
  }

  h3 {
    color: #999591;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 8px;
  }

  h4 {
    text-align: center;
    color: #999591;
    padding-top: 20px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  span {
    display: flex;
    align-items: center;
    width: 70px;

    svg {
      color: #ff9000;
      margin: 0 8px;
    }
  }

  > div {
    background: #3e3b47;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 16px 24px;
    border-radius: 8px;
    margin-left: 14px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      margin-left: 24px;
      font-size: 20px;
    }
  }
`;

const AppearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationCalendar = styled.aside`
  width: 380px;
  animation: ${AppearFromRight} 1s;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
