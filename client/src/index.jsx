// Bring React in to build a component.
import React from 'react';
// Bring reactDOM in to mount component to the dom.
import reactDOM from 'react-dom/client';

import App from './App.jsx';

const root = reactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
