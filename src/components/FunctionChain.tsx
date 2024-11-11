import React, { useState, useEffect } from "react";
import FunctionCard from "./FunctionCard";

const INITIAL_VALUE = 2;

const FunctionChain: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(INITIAL_VALUE);
  const [equations, setEquations] = useState<{ [key: number]: string }>({
    1: "x**2",
    2: "2*x + 4",
    3: "x**2 + 20",
    4: "x - 2",
    5: "x / 2",
  });
  const [outputs, setOutputs] = useState<{ [key: number]: number | string }>(
    {}
  );

  const calculate = (equation: string, input: number): number | string => {
    try {
      const result = eval(equation.replace(/x/g, `(${input})`));
      return isNaN(result) ? "Error" : result;
    } catch (err) {
      console.error("Calculation error:", err);
      return "Error";
    }
  };

  const updateChain = () => {
    const output1 = calculate(equations[1], initialValue);
    const output2 = calculate(equations[2], Number(output1));
    const output4 = calculate(equations[4], Number(output2));
    const output5 = calculate(equations[5], Number(output4));
    const output3 = calculate(equations[3], Number(output5));

    setOutputs({
      1: output1,
      2: output2,
      3: output3,
      4: output4,
      5: output5,
    });
  };

  useEffect(() => {
    updateChain();
  }, [initialValue, equations]);

  const setEquation = (id: number, value: string) => {
    setEquations((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative flex flex-col items-center bg-gray-100 min-h-screen py-24 px-4">
      <div className="flex space-x-28 mb-24">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col items-center">
            <label className="bg-[#E29A2D] text-white font-semibold px-4 py-1 rounded-full mb-2 text-sm">
              Initial Value of x
            </label>
            <div className="border-2 border-[#E29A2D] w-fit bg-white rounded-xl flex items-center p-1">
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="text-black text-lg font-bold focus:outline-none px-3 py-2 rounded-l-full border-none w-[100px]"
              />
            </div>
          </div>
          <FunctionCard
            id={1}
            equation={equations[1]}
            setEquation={setEquation}
            output={outputs[1]}
            nextFunction="2"
          />
        </div>
        <FunctionCard
          id={2}
          equation={equations[2]}
          setEquation={setEquation}
          output={outputs[2]}
          nextFunction="4"
        />

        <div className="flex gap-4 items-end">
          <FunctionCard
            id={3}
            equation={equations[3]}
            setEquation={setEquation}
            output={outputs[3]}
            nextFunction="-"
          />
          <div className="flex flex-col items-center">
            <label className="bg-[#4CAF79] text-white font-semibold px-4 py-1 rounded-full mb-2 text-sm">
              Final Output y
            </label>
            <div className="border-2 border-[#4CAF79] w-fit bg-white rounded-xl flex items-center p-1">
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="text-black text-lg font-bold focus:outline-none px-3 py-2 rounded-l-full border-none w-[100px]"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-28">
        <FunctionCard
          id={4}
          equation={equations[4]}
          setEquation={setEquation}
          output={outputs[4]}
          nextFunction="5"
        />
        <FunctionCard
          id={5}
          equation={equations[5]}
          setEquation={setEquation}
          output={outputs[5]}
          nextFunction="3"
        />
      </div>
    </div>
  );
};

export default FunctionChain;
