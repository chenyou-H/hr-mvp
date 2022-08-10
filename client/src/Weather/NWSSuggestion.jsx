import React from 'react';
import PropTypes from 'prop-types';

export default function NWSList({ feature }) {
  return (
    <>
      <p>
        Afffected Area:
        {feature.properties.areaDesc}
      </p>
      <p>{feature.properties.headline}</p>
      <p>{feature.properties.instruction}</p>
    </>
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
