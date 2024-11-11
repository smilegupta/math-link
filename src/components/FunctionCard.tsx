// src/components/FunctionCard.tsx
import React, { useState } from "react";

interface FunctionCardProps {
  id: number;
  equation: string;
  setEquation: (id: number, value: string) => void;
  output?: number | string;
  nextFunction: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  setEquation,
  nextFunction,
}) => {
  const [inputValue, setInputValue] = useState<string>(equation);
  const [error, setError] = useState<string | null>(null);

  const isValidEquation = (input: string) => {
    if (!/^[\d\s+\-*/^x]+$/.test(input)) {
      setError("Only numbers, 'x', and +, -, *, /, ^ are allowed.");
      return false;
    }

    if (/^\d+$/.test(input) || input === "x") {
      setError(null);
      return true;
    }

    const operands = input.split(/[+\-*/^]/).filter(Boolean);
    if (operands.length < 2) {
      setError("Operators require at least two operands.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    if (isValidEquation(input)) {
      setEquation(id, input);
    }
  };

  return (
    <div className="relative p-6 bg-white shadow-md rounded-2xl w-64 border border-gray-300 flex flex-col">
      <div>
        <div className="flex items-end mb-3">
          <span className="mr-1">
            <GridIcon />
          </span>
          <h3 className="font-bold text-lg text-[#A5A5A5]">Function: {id}</h3>
        </div>
      </div>

      <label className="block text-sm font-semibold color-[#252525]">
        Equation
      </label>
      <input
        type="text"
        className={`border rounded-md w-full mt-2 text-sm p-2 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-indigo-500"
        } transition duration-200`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="e.g., x * 2 + 3"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <label className="block text-sm font-semibold color-[#252525] mt-4">
        Next Function
      </label>
      <div className="relative">
        <select
          className="border border-gray-300 rounded-md w-full mt-2 p-2 bg-gray-100 text-gray-600 cursor-not-allowed appearance-none text-sm"
          disabled
        >
          <option>{`Function: ${nextFunction}`}</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-3 h-3 text-gray-400 mt-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between w-full text-gray-500 text-xs mt-6">
        <span>Input</span>
        <span>Output</span>
      </div>
    </div>
  );
};

export default FunctionCard;

const GridIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="6" fill="#B0B0B0" />
    <circle cx="40" cy="16" r="6" fill="#B0B0B0" />
    <circle cx="64" cy="16" r="6" fill="#B0B0B0" />
    <circle cx="16" cy="40" r="6" fill="#B0B0B0" />
    <circle cx="40" cy="40" r="6" fill="#B0B0B0" />
    <circle cx="64" cy="40" r="6" fill="#B0B0B0" />
  </svg>
);
