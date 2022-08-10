import React from 'react';

export default function SavedList({ city, getWeather }) {
  // const saveListJSON = localStorage.getItem('savedWeathers');
  // const savedList = JSON.parse(saveListJSON);
  // console.log(savedList);
  const getWeatherClickHandler = () => {
    getWeather(city);
  };
  return (
    <div key={city} onClick={getWeatherClickHandler}>
      {city}
    </div>
  );
}
