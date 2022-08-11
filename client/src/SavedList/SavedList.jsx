import React from 'react';
import SavedCity from './SavedCity.jsx';
import styled from 'styled-components';

export default function SavedList({ savedList, getWeather }) {
  // const saveListJSON = localStorage.getItem('savedWeathers');
  // const savedList = JSON.parse(saveListJSON);
  // console.log(savedList);
  return (
    <ListContainer>
      <h5>Your Cities</h5>
      {savedList.map((city) => (
        <SavedCity city={city} getWeather={getWeather} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 10%;
  background-color: green;
  border: 2px solid #4caf50;
`;
