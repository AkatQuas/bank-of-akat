import React, { Fragment, useMemo } from 'react';
import './App.scss';
import { HeaderBar } from './shared/header-bar';
import { Invoice } from './invoice';
import { WeiXinFallback } from './shared/weixin-fallback';

const App = () => {
  const isWeixin = useMemo(() => {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') > -1;
  }, []);
  return (
    <Fragment>
      <HeaderBar />
      {
        isWeixin
          ? <WeiXinFallback />
          : <Invoice />
      }
    </Fragment>
  );
}

export default App;
