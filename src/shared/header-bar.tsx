import React from 'react';
import logoImg from '../assets/logo.png';

const _HeaderBar = () => (
  <div>
    <div className="h-10"></div>
    <div
      className={`
        top-0 inset-x-0 fixed
        flex h-10
        items-center
        bg-white
      `}
    >
      <img src={logoImg} alt="Bank of Akat" className="w-8 h-8 mx-5" />
      <div className="text-lg">Bank of Akat</div>
    </div>
  </div >
);

export const HeaderBar = React.memo(_HeaderBar, () => true);
