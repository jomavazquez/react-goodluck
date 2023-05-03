import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0%{transform:rotate(0turn)}
    100%{transform:rotate(1turn)}
`;

export const SpinnerStyle = styled.img`
  margin: 1rem;
  animation: ${spin} 1s infinite;
`;

export const Spinner = () => {
  return <SpinnerStyle src="https://www.joshwcomeau.com/images/keyframe-animations/loader.svg"></SpinnerStyle>;
}

export default Spinner;