import React from 'react';

export default function SavedList({ city, getWeather }) {
  // const saveListJSON = localStorage.getItem('savedWeathers');
  // const savedList = JSON.parse(saveListJSON);
  // console.log(savedList);
  const getWeatherClickHandler = () => {
    getWeather(city);
  };
  return <div onClick={getWeatherClickHandler}>{city}</div>;
}
