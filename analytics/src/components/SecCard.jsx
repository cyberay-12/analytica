import React from 'react';

const SecCard = ({ number, percent, title }) => {
  return (
    <div className={'bg-white/50 backdrop-blur-md h-32 rounded-lg inset-shadow-xs shadow-xl p-3 col-span-3'}>
        <div className='grid grid-cols-3 h-full'>
          <div className='bg-green-500/50 col-span-1 rounded-lg h-12 w-16'></div>
          <div className='col-span-2 gap-y-0 pt-4'>
            <p className='text-4xl font-sans text-right font-[650] pr-4 align-bottom'>{number}</p>
            <p className='text-right font-sans text-sm pr-4 font-medium'>{percent}</p>
            <p className='text-right font-sans text-sm font-medium pr-4 align-top'>{title}</p>
          </div>
        </div>
    </div>
  );
};

export default SecCard;
