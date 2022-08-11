import React from 'react';
import PropTypes from 'prop-types';

import NWSSuggestion from './NWSSuggestion.jsx';

export default function NWSList({ features }) {
  return (
    <>
      <h4>State Weather Alerts</h4>
      {features.map((feature) => (
        <NWSSuggestion key={feature.id} feature={feature} />
      ))}
    </>
  );
}

NWSList.propTypes = {
  features: PropTypes.arrayOf().isRequired,
};
