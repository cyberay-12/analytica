import React from 'react';

const MainCard = ({ icon, number, title }) => {
  return (
    <div className='bg-green-600/80 backdrop-blur-md h-36 rounded-lg inset-shadow-xs shadow-xl p-3'>
      <div className='grid grid-cols-4 h-full'>
        <div className='bg-white col-span-1 rounded-lg h-12 w-16 flex items-center justify-center'>
          {icon}
        </div>
        <div className='col-span-3 pt-8'>
          <p className='text-white text-right text-5xl md:text-6xl font-[650] pr-4'>{number ?? 0}</p>
          <p className='text-right text-white text-[11px] md:text-[15px] font-[550] pr-4'>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
