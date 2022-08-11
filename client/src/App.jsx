import React from 'react';
import styled from 'styled-components';

import AddressInputForm from './AddressInputForm.jsx';

export default function App() {
  return (
    <StyledBody>
      <StyledImg
        src="https://i.pinimg.com/originals/2d/7d/07/2d7d0701530a47273917c4bcf77e82c2.jpg"
        // src="//cdn.weatherapi.com/weather/64x64/night/113.png"
        alt="weather icon"
        height="100"
        width="100"
      />
      <h1>US Weather</h1>
      <AddressInputForm />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  text-align: center;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  // position: fixed;
  top: 0;
  left: 30%;
`;
