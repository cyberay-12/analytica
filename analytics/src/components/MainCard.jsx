import React from 'react';

const MainCard = ({ number, title }) => {
  return (
    <div className={'bg-green-600/80 backdrop-blur-md h-32 rounded-lg inset-shadow-xs shadow-xl p-3 col-span-3'}>
        <div className='grid grid-cols-2 h-full'>
          <div className='bg-white col-span-1 rounded-lg h-12 w-16'></div>
          <div className='col-span-1 pt-8'>
            <p className='text-5xl text-white font-sans text-right font-[650] pr-4'>{number}</p>
            <p className='text-right font-medium text-white font-sans text-sm pr-4'>{title}</p>
          </div>
        </div>
    </div>
    // <div>
    //   <h1>Hello, {name}!</h1>
    //   <p>{message}</p>
    // </div>
  );
};

export default MainCard;
