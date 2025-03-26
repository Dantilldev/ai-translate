import React from 'react';

export default function Dropdown({options, value, onChange}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border-slate-300 border rounded-md px-3 py-2 mb-2 w-fit "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
