import React from 'react';

const MainCard = ({ number, title }) => {
  return (
    <div className='bg-green-600/80 backdrop-blur-md h-32 rounded-lg inset-shadow-xs shadow-xl p-3'>
      <div className='grid grid-cols-2 h-full'>
        <div className='bg-white col-span-1 rounded-lg h-12 w-16'></div>
        <div className='col-span-1 pt-8'>
          <p className='text-white font-sans text-right text-4xl sm:text-4xl font-[650] pr-4'>{number}</p>
          <p className='text-right text-white font-sans text-[12px] md:text-sm font-[550] pr-4'>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
