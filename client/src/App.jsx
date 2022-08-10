import React from 'react';
import styled from 'styled-components';

import AddressInputForm from './AddressInputForm.jsx';

export default function App() {
  return (
    <StyledBody>
      <h1>Hello App</h1>
      <AddressInputForm />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  background: green;
  text-align: center;
`;
