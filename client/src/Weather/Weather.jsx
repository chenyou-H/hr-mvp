import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NWSList from './NWSList.jsx';
import Chart from './Chart.jsx';

export default function Weather({ city, weathers }) {
  const todayTmp = weathers.today.current.temp_f;
  const yesterdayTmp = weathers.yesterday.forecast.forecastday[0].day.avgtemp_f;
  const tmpData = {
    labels: ['yesterday', 'today'],
    datasets: [
      {
        label: 'Temperature',
        data: [yesterdayTmp, todayTmp],
        backgroundColor: ['white'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <h2>{weathers.today.location.name}</h2>
      <p>{weathers.today.current.condition.text}</p>
      <img
        src={weathers.today.current.condition.icon}
        alt={weathers.today.current.condition.text}
        height="200"
        width="200"
      />
      <TmpContainer>
        Today:
        {todayTmp}
        °F
      </TmpContainer>
      <TmpContainer>
        Yesterday:
        {yesterdayTmp}
        °F
      </TmpContainer>
      <ConclusonContainer>
        {todayTmp > yesterdayTmp
          ? `Now is ${((1 - todayTmp / yesterdayTmp) * 100).toFixed()}% hotter than yesterday`
          : `Now is ${((1 - todayTmp / yesterdayTmp) * 100).toFixed()}% colder than yesterday`}
      </ConclusonContainer>
      <Chart chartData={tmpData} />
      <NWSList features={weathers.suggestion.features} />
    </>
  );
}

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  weathers: PropTypes.shape({
    today: PropTypes.shape({
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
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

const TmpContainer = styled.div`
  font-size: 50px;
`;

const ConclusonContainer = styled.div`
  font-size: 50px;
  font-weight: bold;
`;
