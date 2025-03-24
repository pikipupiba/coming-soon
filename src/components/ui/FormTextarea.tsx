'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block mb-2 font-medium text-black dark:text-white"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 border rounded-md bg-white dark:bg-black 
            text-black dark:text-white 
            focus:outline-hidden focus:ring-3 focus:ring-primary
            disabled:opacity-50
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
            ${className}
          `}
          rows={props.rows || 4}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
