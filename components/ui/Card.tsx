import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-soft hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-5 md:p-6 border-b border-slate-100 ${className}`}>{children}</div>;
};

const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-5 md:p-6 ${className}`}>{children}</div>;
};

const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
    return <h3 className={`text-lg md:text-xl font-bold text-slate-800 tracking-tight ${className}`}>{children}</h3>;
};

const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => {
    return <p className={`text-sm text-slate-500 mt-1 leading-relaxed ${className}`}>{children}</p>;
};

export { Card, CardHeader, CardContent, CardTitle, CardDescription };