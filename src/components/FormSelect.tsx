import React, { forwardRef } from 'react';

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: FormSelectOption[];
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1.5 sm:gap-2 md:gap-2.5">
        <label className="font-semibold text-sm sm:text-base md:text-lg text-[#212529]">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            {...props}
            className={`bg-white border-2 ${
              error ? 'border-red-500' : 'border-[#ADD8E6]'
            } h-[44px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full px-3 sm:px-4 md:px-5 rounded-lg sm:rounded-xl font-normal text-xs sm:text-sm md:text-base text-black outline-none appearance-none cursor-pointer focus:border-brand-primary transition-colors`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-text-dark">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#B8B8C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-[10px] sm:text-xs md:text-sm text-red-500 mt-0.5 sm:mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
