import React, { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function CurrencyInput({ className, error, errorMessage, ...props }, ref) {
    const [showCurrencySymbol, setShowCurrencySymbol] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setShowCurrencySymbol(value !== ''); // Mostra o símbolo se o valor não estiver vazio
  };
  const inputClassName = twMerge(
    'rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-center text-dark placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary',
    error ? 'border-red-500' : '',
    className,
  );

  return (
    <div className="flex w-full flex-col">
         <div className="relative">
        {showCurrencySymbol && (
          <span className="absolute inset-y-0 left-0 pl-4 flex font-medium text-base text-gray-700  items-center pointer-events-none">
            R$
          </span>
        )}
      <input
        lang="pt-BR"
        className={inputClassName}
        {...props}
        ref={ref} 
        onChange={handleInputChange}
        
      />
      {error && errorMessage && <span className="mt-1 text-xs text-center text-red-400">{errorMessage}</span>}
    </div>
    </div>
  );
}

export default forwardRef(CurrencyInput);
