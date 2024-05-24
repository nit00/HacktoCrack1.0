import React from 'react';
import styled, { keyframes } from 'styled-components';

const typingAnimation = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const TypingDots = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  margin: 5px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 2px;
  animation: ${typingAnimation} 1.5s infinite ${({ delay }) => delay}s;
`;

function TypingIndicator() {
  return (
    <TypingDots>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </TypingDots>
  );
}

export default TypingIndicator;
