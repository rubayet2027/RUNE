import React from 'react';

export const Table = ({ headers = [], caption = 'Data grid table', children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto border border-[#1A1A1A] bg-[#121314]">
      <table className={`w-full text-left border-collapse text-xs font-sans ${className}`}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#1A1A1A]/60 border-b border-[#1A1A1A] text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E9192]">
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" className="py-4 px-6 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A] text-white">{children}</tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ children, className = '', onClick }) => (
  <tr
    onClick={onClick}
    className={`hover:bg-[#1A1A1A]/30 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`py-4 px-6 text-xs text-[#E3E2E2] font-sans ${className}`}>{children}</td>
);
