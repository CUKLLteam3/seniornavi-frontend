import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = 'btn-primary';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};