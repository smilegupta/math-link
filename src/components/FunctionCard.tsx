// src/components/FunctionCard.tsx
import React, { useState, useEffect } from "react";

interface FunctionCardProps {
  id: number;
  equation: string;
  setEquation: (id: number, value: string) => void;
  output: number | string;
  nextFunction: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  setEquation,
  output,
  nextFunction,
}) => {
  const [inputValue, setInputValue] = useState<string>(equation);
  const [error, setError] = useState<string | null>(null);
  const [displayOutput, setDisplayOutput] = useState<number | string | null>(
    null
  );

  useEffect(() => {
    if (!error && inputValue) {
      setDisplayOutput(output);
    } else {
      setDisplayOutput(null);
    }
  }, [error, inputValue, output]);

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
    <div className="relative p-6 bg-white shadow-md rounded-lg w-64 border border-gray-300 flex flex-col items-center">
      <h3 className="font-bold text-lg text-gray-700 mb-3">Function {id}</h3>
      <label className="block text-sm text-gray-500">Equation</label>
      <input
        type="text"
        className={`border rounded-md w-full mt-2 p-2 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-indigo-500"
        } transition duration-200`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="e.g., x * 2 + 3"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <label className="block text-sm text-gray-500 mt-4">Next Function</label>
      <select
        className="border border-gray-300 rounded-md w-full mt-2 p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
        disabled
      >
        <option>{nextFunction}</option>
      </select>
      <div className="mt-4 font-semibold text-indigo-600">
        Output: {displayOutput !== null ? displayOutput : ""}
      </div>
      <div className="flex justify-between w-full text-gray-500 text-xs mt-6">
        <span>Input</span>
        <span>Output</span>
      </div>
    </div>
  );
};

export default FunctionCard;
