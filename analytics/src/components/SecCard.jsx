import React from 'react';

const SecCard = ({ number, percent, title }) => {
  return (
    <div className='bg-white/50 backdrop-blur-md h-32 rounded-lg inset-shadow-xs shadow-xl p-3 overflow-hidden'>
      <div className='grid grid-cols-3 h-full'>
        <div className='bg-green-500/50 col-span-1 rounded-lg h-12 w-16'></div>
        <div className='col-span-2 pt-4'>
          <p className='text-4xl sm:text-4xl font-sans text-right font-[650] pr-4 align-bottom'>{number}</p>
          <p className='text-[12px] md:text-[1px] text-right font-sans pr-4 font-medium'>{percent}</p>
          <p className='text-[11px] md:text-[13px] mb-8 text-right font-sans font-medium pr-4 align-top'>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SecCard;
