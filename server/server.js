const express = require('express');
const path = require('path');
const axios = require('axios');
const cities = require('cities');
const states = require('us-state-converter');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// app.get('/suggestion', (req, res) => {
//   const { state } = req.query;
//   // console.log(state);
//   axios.get(`http://api.weather.gov/alerts/active?area=${state}`).then((weather) => {
//     // console.log(weather.data);
//     res.send(weather.data);
//   }).catch((error) => {
//     res.sendStatus(500);
//     console.log(error);
//   });
// });

app.get('/city', (req, res) => {
  const { city } = req.query;
  const today = new Date();
  let yesterday = new Date(today);
  let tomorrow = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowOffset = tomorrow.getTimezoneOffset();
  const offset = yesterday.getTimezoneOffset();
  yesterday = new Date(yesterday.getTime() - (offset * 60 * 1000));
  tomorrow = new Date(tomorrow.getTime() + (tomorrowOffset * 60 * 1000));

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

  const optionsFuture = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: city, days: '1', dt: tomorrow.toISOString().split('T')[0] },
    headers: {
      'X-RapidAPI-Key': '998548fbcemsh9e1e23344309d89p1e09e1jsna88818e8336a',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const currentWeather = axios.request(optionsCurrentWeather);
  const yesterdayWeather = axios.request(options);
  const tomorrowWeather = axios.request(optionsFuture);

  Promise.all([currentWeather, yesterdayWeather, tomorrowWeather])
    .then((responses) => {
      const data = {
        today: responses[0].data, yesterday: responses[1].data, future: responses[2].data,
      };
      const abbr = states.abbr(data.today.location.region);
      axios.get(`http://api.weather.gov/alerts/active?area=${abbr}`).then((weather) => {
        // console.log(weather.data);
        data.suggestion = weather.data;
        res.send(data);
      }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
      });
      // res.send(data);
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
