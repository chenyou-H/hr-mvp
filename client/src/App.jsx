import React from 'react';
import styled from 'styled-components';

import AddressInputForm from './AddressInputForm.jsx';
import Logo from './Logo.jsx';

export default function App() {
  return (
    <StyledBody>
      <Logo />
      <h1>US Weather</h1>
      <AddressInputForm />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  text-align: center;
  padding-top: 50px;
`;

// const StyledImg = styled.img`
//   border-radius: 50%;
//   top: 0;
//   left: 30%;
// `;
