import React from 'react';
import SavedCity from './SavedCity.jsx';
import styled from 'styled-components';

export default function SavedList({ savedList, getWeather }) {
  // const saveListJSON = localStorage.getItem('savedWeathers');
  // const savedList = JSON.parse(saveListJSON);
  // console.log(savedList);
  return (
    <ListContainer>
      <h3>Your Cities</h3>
      {savedList.map((city) => (
        <SavedCity key={city} city={city} getWeather={getWeather} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  position: fixed;
  top: 0;
  right: 10%;
  width: 10%;
  background-color: papayawhip;
  border: 2px solid black;
  color: black;
`;
