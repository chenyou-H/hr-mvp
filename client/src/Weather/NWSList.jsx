import React from 'react';
import PropTypes from 'prop-types';

import NWSSuggestion from './NWSSuggestion.jsx';

export default function NWSList({ features }) {
  return (
    <div>
      <h2>State Weather Alerts</h2>
      {features.map((feature) => (
        <NWSSuggestion key={feature.id} feature={feature} />
      ))}
    </div>
  );
}

NWSList.propTypes = {
  features: PropTypes.arrayOf().isRequired,
};
