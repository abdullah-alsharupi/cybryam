import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-blue-950 h-16 w-16"></div>
    </div>
  );
};

export default Loader;