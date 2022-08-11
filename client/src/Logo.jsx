import React from 'react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <StyledImg
      src="https://i.pinimg.com/originals/2d/7d/07/2d7d0701530a47273917c4bcf77e82c2.jpg"
      alt="weather icon"
      height="100"
      width="100"
    />
  );
}

const StyledImg = styled.img`
  border-radius: 50%;
  top: 0;
  left: 30%;
`;
