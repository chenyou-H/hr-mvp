import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function NWSList({ feature }) {
  return (
    <StyledContainer>
      <p>
        Area:
        {feature.properties.areaDesc}
      </p>
      <p>{feature.properties.headline}</p>
      <p>{feature.properties.instruction}</p>
    </StyledContainer>
  );
}

NWSList.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.shape({
      headline: PropTypes.string.isRequired,
      instruction: PropTypes.string.isRequired,
      areaDesc: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const StyledContainer = styled.div`
  border-style: solid;
  text-align: left;
`;
