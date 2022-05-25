import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
    <div className="loader">
    <Circles ariaLabel="loading-indicator" />
    </div>
    </>
  )
}

export default Loader