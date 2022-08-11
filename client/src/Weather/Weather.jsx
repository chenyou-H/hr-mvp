import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NWSList from './NWSList.jsx';
import Chart from './Chart.jsx';

export default function Weather({ weathers }) {
  // const todayTmp = weathers.today.current.temp_f;
  const todayTmp = weathers.future.current.temp_f;
  const yesterdayTmp = weathers.yesterday.forecast.forecastday[0].day.avgtemp_f;
  const futureTmp = weathers.future.forecast.forecastday[0].day.avgtemp_f;
  const tmpData = {
    labels: ['yesterday', 'today', 'tomorrow'],
    datasets: [
      {
        label: 'Temperature',
        data: [yesterdayTmp, todayTmp, futureTmp],
        backgroundColor: ['white'],
        borderWidth: 4,
        borderColor: 'black',
      },
    ],
  };
  return (
    <>
      <h2>{weathers.future.location.name}</h2>
      <p>{weathers.future.current.condition.text}</p>
      <img
        src={weathers.future.current.condition.icon}
        alt={weathers.future.current.condition.text}
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
      <TmpContainer>
        Tomorrow:
        {futureTmp}
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
  weathers: PropTypes.shape({
    future: PropTypes.shape({
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
