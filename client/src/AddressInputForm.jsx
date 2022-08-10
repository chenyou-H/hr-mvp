import React, { useState } from 'react';
import axios from 'axios';

import { Weather } from './Weather';

export default function AddressInputForm() {
  const [address, setAddress] = useState('');
  const [show, setShow] = useState(false);
  const [weathers, setWeathers] = useState({});
  const submitButtonHandler = (e) => {
    e.preventDefault();
    // const options = {
    //   method: 'GET',
    //   url: '/suggestion',
    //   params: { state: address },
    // };
    // const getSuggestion = axios.request(options);
    // Promise.all([getSuggestion])
    //   .then((response) => {
    //     console.log(response[0].data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const options = {
      method: 'GET',
      url: '/city',
      params: { city: address },
    };
    const getSuggestion = axios.request(options);
    Promise.all([getSuggestion])
      .then((response) => {
        console.log(response[0].data);
        setShow(true);
        setWeathers(response[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inputChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <form>
        <label>
          Address:
          <input type="text" name="address" value={address} onChange={inputChangeHandler} />
        </label>
        <input type="submit" value="Submit" onClick={submitButtonHandler} />
      </form>
      {show && <Weather city={address} weathers={weathers} />}
    </>
  );
}
