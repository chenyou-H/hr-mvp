// Bring React in to build a component.
import React from 'react';
// Bring reactDOM in to mount component to the dom.
import reactDOM from 'react-dom';

// Here is out base App component.
// Notice we are NOT using jsx here. This is because we have not set up babel yet.
const App = React.createElement('h1', null, 'Hello World');

// Render our app to the dom mounted to the element with id of root inside our
// public/index.html file.
reactDOM.render(App, document.getElementById('root'));
