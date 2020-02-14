import React, { Fragment } from 'react';
import './App.scss';
import { HeaderBar } from './shared/header-bar';
import { Invoice } from './invoice';

const App = () => {
  return (
    <Fragment>
      <HeaderBar />
      <Invoice />
    </Fragment>
  );
}

export default App;
