'use client';

import { TextareaHTMLAttributes } from 'react';

// Using React 19 direct ref prop without forwardRef
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  ref?: React.RefObject<HTMLTextAreaElement>;
}

// React 19: No need for forwardRef wrapper
function FormTextarea({ 
  label, 
  error, 
  helperText, 
  className = '', 
  ref,
  ...props 
}: FormTextareaProps) {
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

export default FormTextarea;
