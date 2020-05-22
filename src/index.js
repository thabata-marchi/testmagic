import React from 'react';
import Routes from './routes';
import {StateProvider} from './store.js';
import './config/StatusBarConfig';

const App = () => {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
};
export default App;
