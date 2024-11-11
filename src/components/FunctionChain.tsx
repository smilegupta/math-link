import React, { useState, useEffect, useRef } from "react";
import FunctionCard from "./FunctionCard";
import Connector from "./Connector";

const INITIAL_VALUE = 2;

const FunctionChain: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(INITIAL_VALUE);
  const [equations, setEquations] = useState({
    1: "x**2",
    2: "2*x + 4",
    3: "x**2 + 20",
    4: "x - 2",
    5: "x / 2",
  });
  const [outputs, setOutputs] = useState<{ [key: number]: number | string }>(
    {}
  );

  const initialInputRef = useRef<HTMLDivElement>(null);
  const finalOutputRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const calculate = (equation: string, input: number): number | string => {
    try {
      const result = eval(equation.replace(/x/g, `(${input})`));
      return isNaN(result) ? "Error" : result;
    } catch {
      return "Error";
    }
  };

  const updateOutputs = () => {
    const result1 = calculate(equations[1], initialValue);
    const result2 = calculate(equations[2], Number(result1));
    const result4 = calculate(equations[4], Number(result2));
    const result5 = calculate(equations[5], Number(result4));
    const result3 = calculate(equations[3], Number(result5));

    setOutputs({ 1: result1, 2: result2, 3: result3, 4: result4, 5: result5 });
  };

  const setEquation = (id: number, value: string) => {
    setEquations((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    updateOutputs();
  }, [initialValue, equations]);

  const drawLine = (
    type: string,
    startElement: HTMLDivElement | null,
    endElement: HTMLDivElement | null,
    offset?: number[]
  ) => {
    const svgContainer = document.getElementById("svg-lines");
    if (!svgContainer || !startElement || !endElement) return;

    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const x1 = startRect.right;
    const y1 = startRect.top + startRect.height / 2;
    const x2 = endRect.left;
    const y2 = endRect.top + endRect.height / 2;

    const createLine = (x1: number, y1: number, x2: number, y2: number) => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1.toString());
      line.setAttribute("y1", y1.toString());
      line.setAttribute("x2", x2.toString());
      line.setAttribute("y2", y2.toString());
      line.setAttribute("stroke", "#0066FF");
      line.setAttribute("stroke-width", "4");
      line.setAttribute("stroke-opacity", "0.5");
      line.setAttribute("stroke-linecap", "round");
      svgContainer.appendChild(line);
    };

    const createCurvedLine = () => {
      const controlPointX1 = x1 + 275;
      const controlPointY1 = y1 - 50;
      const controlPointX2 = x2 - 270;
      const controlPointY2 = y2 + 50;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        `M ${x1} ${y1} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${x2} ${y2}`
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#0066FF");
      path.setAttribute("stroke-width", "4");
      path.setAttribute("stroke-opacity", "0.5");
      path.setAttribute("stroke-linecap", "round");
      svgContainer.appendChild(path);
    };

    if (type === "straight") {
      createLine(x1, y1, x2, y1); // Horizontal
      createLine(x2, y1, x2, y2); // Vertical
    } else if (type === "curved") {
      createCurvedLine();
    } else if (type === "offset") {
      const [offsetStart, offsetEnd] = offset || [0, 0];
      createLine(
        startRect.left + startRect.width / 2,
        startRect.bottom - offsetStart,
        endRect.left + endRect.width / 2,
        endRect.bottom - offsetEnd
      );
    }
  };

  useEffect(() => {
    document.getElementById("svg-lines")?.replaceChildren();

    drawLine("offset", initialInputRef.current, cardRefs.current[0], [10, 10]);
    drawLine("straight", cardRefs.current[1], cardRefs.current[2]);
    drawLine("curved", cardRefs.current[3], cardRefs.current[6]);
    drawLine("straight", cardRefs.current[7], cardRefs.current[8]);
    drawLine("curved", cardRefs.current[9], cardRefs.current[4]);
    drawLine("offset", cardRefs.current[5], finalOutputRef.current, [10, 10]);
  }, [outputs]);

  return (
    <div className="relative flex flex-col items-center bg-gray-100 min-h-screen py-24 px-4">
      <svg
        id="svg-lines"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></svg>

      <div className="flex space-x-28 mb-24">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col items-center">
            <label className="bg-[#E29A2D] text-white font-semibold px-4 py-1 rounded-full mb-2 text-sm">
              Initial Value of x
            </label>
            <div className="border-2 border-[#E29A2D] w-fit bg-white rounded-xl flex items-center">
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="text-black text-lg font-bold focus:outline-none pl-3 py-2 rounded-l-full  w-[65px] border-[#FFEED5] border-r-2"
              />
              <div ref={initialInputRef} className="px-2">
                <Connector size={20} />
              </div>
            </div>
          </div>
          <FunctionCard
            id={1}
            equation={equations[1]}
            setEquation={setEquation}
            output={outputs[1]}
            nextFunction="2"
            connectorRefInput={(el) => (cardRefs.current[0] = el!)}
            connectorRefOutput={(el) => (cardRefs.current[1] = el!)}
          />
        </div>

        <FunctionCard
          id={2}
          equation={equations[2]}
          setEquation={setEquation}
          output={outputs[2]}
          nextFunction="4"
          connectorRefInput={(el) => (cardRefs.current[2] = el!)}
          connectorRefOutput={(el) => (cardRefs.current[3] = el!)}
        />

        <div className="flex gap-4 items-end">
          <FunctionCard
            id={3}
            equation={equations[3]}
            setEquation={setEquation}
            output={outputs[3]}
            nextFunction="-"
            connectorRefInput={(el) => (cardRefs.current[4] = el!)}
            connectorRefOutput={(el) => (cardRefs.current[5] = el!)}
          />

          <div className="flex flex-col items-center">
            <label className="bg-[#4CAF79] text-white font-semibold px-4 py-1 rounded-full mb-2 text-sm">
              Final Output y
            </label>
            <div className="border-2 border-[#4CAF79] w-fit bg-white rounded-xl flex items-center">
              <div ref={finalOutputRef} className="px-2">
                <Connector size={20} />
              </div>
              <input
                readOnly
                type="number"
                value={outputs[3] ?? initialValue}
                className="text-black text-lg font-bold focus:outline-none py-2 px-3 rounded-xl-full bg-transparent w-[65px] border-[#C5F2DA] border-l-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-36">
        <FunctionCard
          id={4}
          equation={equations[4]}
          setEquation={setEquation}
          output={outputs[4]}
          nextFunction="5"
          connectorRefInput={(el) => (cardRefs.current[6] = el!)}
          connectorRefOutput={(el) => (cardRefs.current[7] = el!)}
        />

        <FunctionCard
          id={5}
          equation={equations[5]}
          setEquation={setEquation}
          output={outputs[5]}
          nextFunction="3"
          connectorRefInput={(el) => (cardRefs.current[8] = el!)}
          connectorRefOutput={(el) => (cardRefs.current[9] = el!)}
        />
      </div>
    </div>
  );
};

export default FunctionChain;
