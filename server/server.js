const express = require('express');
const path = require('path');
const axios = require('axios');
const cities = require('cities');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/suggestion', (req, res) => {
  const { state } = req.query;
  console.log(state);
  axios.get(`http://api.weather.gov/alerts/active?area=${state}`).then((weather) => {
    // console.log(weather.data);
    res.send(weather.data);
  }).catch((error) => {
    res.sendStatus(500);
    console.log(error);
  });
});

// app.get('/city', (req, res) => {
//   const { zipcode } = req.query;
//   const addressInfor = cities.zip_lookup(zipcode);
//   console.log(addressInfor);
//   const { latitude, longitude, state_abbr } = addressInfor;
//   axios.get(`https://api.weather.gov/points/${latitude},${longitude}`)
//     .then((weather) => {
//       const { gridX, gridY } = weather.data.properties;
//       console.log(gridX, ' && ', gridY);
//       res.send(weather.data.properties);
//     }).catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/city', (req, res) => {
//   const { city } = req.query;
//   axios.get(`https://goweather.herokuapp.com/weather/${city}`)
//     .then((weather) => {
//       console.log(parseInt(weather.data.temperature, 10));
//       res.send(weather.data);
//     }).catch((error) => {
//       res.sendStatus(500);
//       console.log(error);
//     });
// });

app.get('/city', (req, res) => {
  const { city } = req.query;
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const offset = yesterday.getTimezoneOffset();
  yesterday = new Date(yesterday.getTime() - (offset * 60 * 1000));

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/history.json',
    params: { q: city, dt: yesterday.toISOString().split('T')[0], lang: 'en' },
    headers: {
      'X-RapidAPI-Key': '998548fbcemsh9e1e23344309d89p1e09e1jsna88818e8336a',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const optionsCurrentWeather = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: city },
    headers: {
      'X-RapidAPI-Key': '998548fbcemsh9e1e23344309d89p1e09e1jsna88818e8336a',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const currentWeather = axios.request(optionsCurrentWeather);
  const yesterdayWeather = axios.request(options);

  // axios.request(options).then((response) => {
  //   console.log(response.data);
  //   res.send(response.data);
  // }).catch((error) => {
  //   res.sendStatus(500);
  //   console.error(error);
  // });
  Promise.all([currentWeather, yesterdayWeather])
    .then((responses) => {
      const data = { today: responses[0].data, yesterday: responses[1].data };
      res.send(data);
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
