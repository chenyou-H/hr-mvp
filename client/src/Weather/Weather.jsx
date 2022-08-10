import React from 'react';

export default function Weather({ city, weathers }) {
  return (
    <>
      <h2>{city}</h2>
      <p>{weathers.today.current.condition.text}</p>
      <img
        src={weathers.today.current.condition.icon}
        alt={weathers.today.current.condition.text}
      />
      <p>{weathers.today.current.temp_f}</p>
    </>
  );
}
