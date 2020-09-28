import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ white }) => {
  return (
    <div className={`${white ? '' : 'bg-dark-b2b'} w-100 h-100  d-flex justify-content-center align-items-center`}>
      <Loader type="Grid" color="#028fb6" height={100} width={100} />
    </div>
  );
};

export default Loading;
