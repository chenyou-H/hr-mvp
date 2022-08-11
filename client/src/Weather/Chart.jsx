import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import PropTypes from 'prop-types';

export default function Chart({ chartData }) {
  return <Line data={chartData} />;
}

Chart.propTypes = {
  chartData: PropTypes.shape().isRequired,
};
