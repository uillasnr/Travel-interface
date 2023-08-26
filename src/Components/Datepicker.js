import React, { forwardRef } from 'react'
import { twMerge } from "tailwind-merge";
import DatePicker, {registerLocale} from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

const DatePickerDete = forwardRef(({ className, error, errorMessage, ...props }, ref) => {
    const inputClassName = twMerge(
        className,
        'rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-dark placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary',
        error ? 'border-red-500' : '',
    )

    return (
        <div className="flex w-52 flex-col">
            <DatePicker
                locale="pt-BR"
                wrapperClassName="w-full"
                className={inputClassName}
                enableTabLoop={false}
                {...props}
            />
            {error && errorMessage && (
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            )}
        </div>
    )
})

export default DatePickerDete