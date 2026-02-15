import React from 'react';

const SecCard = ({ icon, number, percent, title }) => {
  return (
    <div className='border-l-5 border-green-600 bg-white/50 backdrop-blur-md h-36 rounded-lg inset-shadow-xs shadow-xl p-3 overflow-hidden'>
      <div className='grid grid-cols-3 h-full'>
        <div className='bg-green-500/70 col-span-1 rounded-lg h-12 w-16 flex items-center justify-center'>
          {icon}
        </div>
        <div className='col-span-2 pt-9'>
          <p className='text-4xl sm:text-5xl text-right font-[750] pr-4 align-bottom text-gray-800'>{number ?? 0}</p>
          <p className={'text-[12px] md:text-[12px] text-right pr-4 font-medium'}>{percent}</p>
          <p className='text-[10px] md:text-[12px] mb-8 text-right font-medium pr-4'>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SecCard;
