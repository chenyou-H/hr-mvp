import React, { useState } from 'react';
import axios from 'axios';

import { Weather } from './Weather';
import { SavedList } from './SavedList';

export default function AddressInputForm() {
  const [address, setAddress] = useState('');
  const [show, setShow] = useState(false);
  const [weathers, setWeathers] = useState({});
  const [savedList, setSavedList] = useState(
    JSON.parse(localStorage.getItem('savedWeathers')) || []
  );

  const getWeather = (city) => {
    const options = {
      method: 'GET',
      url: '/city',
      params: { city },
    };
    const getSuggestion = axios.request(options);
    Promise.all([getSuggestion])
      .then((response) => {
        // console.log(response[0].data);
        setShow(true);
        setWeathers(response[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitButtonHandler = (e) => {
    e.preventDefault();
    getWeather(address);
  };

  const inputChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const saveButtonHandler = (e) => {
    e.preventDefault();
    // localStorage.clear();
    const lowcaseAddress = address.toLowerCase();
    let tmpSavedList = localStorage.getItem('savedWeathers');
    console.log('localstorage ', tmpSavedList);
    if (tmpSavedList === null) {
      const initArray = [lowcaseAddress];
      const savedListJSON = JSON.stringify(initArray);
      localStorage.setItem('savedWeathers', savedListJSON);
      setSavedList(initArray);
    } else {
      tmpSavedList = JSON.parse(tmpSavedList);
      if (tmpSavedList.includes(lowcaseAddress) === false) {
        tmpSavedList.push(lowcaseAddress);
        const savedListJSON = JSON.stringify(tmpSavedList);
        localStorage.setItem('savedWeathers', savedListJSON);
        setSavedList([...tmpSavedList]);
      }
    }
  };

  const clearSavedListClickHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    setSavedList([]);
  };

  return (
    <>
      <form>
        <label>
          Address:
          <input type="text" name="address" value={address} onChange={inputChangeHandler} />
        </label>
        <input type="submit" value="Submit" onClick={submitButtonHandler} />
        <input type="submit" value="Saved" onClick={saveButtonHandler} />
        <input type="submit" value="Clear List" onClick={clearSavedListClickHandler} />
      </form>
      <SavedList savedList={savedList} getWeather={getWeather} />
      {show && <Weather city={address} weathers={weathers} />}
    </>
  );
}
