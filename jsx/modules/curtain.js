import React from 'react';

const Curtain = ({children}) => {
  return <div className="curtain-screen">
    {children}
  </div>
}

export default Curtain;