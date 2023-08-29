import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

function Input({ className, error, errorMessage, ...props }, ref) {
  const inputClassName = twMerge(
    'rounded-lg border border-gray-300 bg-white p-2 text-center text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all',
    error ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
    className
  );

  return (
    <div className="flex w-full flex-col">
      <input
        className={inputClassName}
        {...props}
        ref={ref} 
      />
      {error && errorMessage && <span className="mt-1 text-xs text-center text-red-400">{errorMessage}</span>}
    </div>
  );
}

export default forwardRef(Input);
