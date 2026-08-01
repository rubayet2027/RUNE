import React from 'react';

export const Table = ({ headers = [], caption = 'Data grid table', children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto border border-rune-border bg-rune-bg">
      <table className={`w-full text-left border-collapse text-xs font-sans ${className}`}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-rune-surface/60 border-b border-rune-border text-[10px] font-mono uppercase tracking-[0.2em] text-rune-secondary">
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" className="py-4 px-6 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A] text-rune-primary">{children}</tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ children, className = '', onClick }) => (
  <tr
    onClick={onClick}
    className={`hover:bg-rune-surface/30 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`py-4 px-6 text-xs text-rune-primary font-sans ${className}`}>{children}</td>
);
