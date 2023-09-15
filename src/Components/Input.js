import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

function Input({ className, error, errorMessage, ...props }, ref) {
  const inputClassName = twMerge(
    'rounded-lg border border-gray-400 bg-white p-2 text-center text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-30 outline-none transition-all focus:outline-none focus:border-cyan-700 shadow-sm',
    error ? 'border-red-500' : '',
    className
  );

  return (
    <div className="flex w-full flex-col">
      <input
        className={inputClassName}
        {...props}
        ref={ref} 
      />
      {error && errorMessage && <span className="mt-1 text-xs text-center text-red-400 ">{errorMessage}</span>}
    </div>
  );
}

export default forwardRef(Input);
