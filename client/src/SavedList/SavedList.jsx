import React from 'react';
import SavedCity from './SavedCity.jsx';

export default function SavedList({ savedList, getWeather }) {
  // const saveListJSON = localStorage.getItem('savedWeathers');
  // const savedList = JSON.parse(saveListJSON);
  // console.log(savedList);
  return (
    <>
      {savedList.map((city) => (
        <SavedCity city={city} getWeather={getWeather} />
      ))}
    </>
  );
}
