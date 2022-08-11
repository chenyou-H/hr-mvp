import React from 'react';
import PropTypes from 'prop-types';

import NWSList from './NWSList.jsx';

export default function Weather({ city, weathers }) {
  const todayTmp = weathers.today.current.temp_f;
  const yesterdayTmp = weathers.yesterday.forecast.forecastday[0].day.avgtemp_f;
  return (
    <>
      <h2>{weathers.today.location.name}</h2>
      <p>{weathers.today.current.condition.text}</p>
      <img
        src={weathers.today.current.condition.icon}
        alt={weathers.today.current.condition.text}
        height="160"
        width="160"
      />
      <p>
        Today:
        {todayTmp}
        °F
      </p>
      <p>
        Yesterday:
        {yesterdayTmp}
        °F
      </p>
      <p>
        {todayTmp > yesterdayTmp
          ? `Today is ${((1 - todayTmp / yesterdayTmp) * 100).toFixed()}% hotter than yesterday`
          : `Today is ${((1 - todayTmp / yesterdayTmp) * 100).toFixed()}% colder than yesterday`}
      </p>
      <NWSList features={weathers.suggestion.features} />
    </>
  );
}

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  weathers: PropTypes.shape({
    today: PropTypes.shape({
      current: PropTypes.shape({
        condition: PropTypes.shape({
          icon: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }),
        temp_f: PropTypes.number.isRequired,
      }),
    }),
    suggestion: PropTypes.shape({
      features: PropTypes.arrayOf(),
    }),
    yesterday: PropTypes.shape({
      forecast: PropTypes.shape({
        forecastday: PropTypes.arrayOf(),
      }),
    }),
  }).isRequired,
};
