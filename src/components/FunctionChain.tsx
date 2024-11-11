import React, { useState, useEffect, useRef } from "react";
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

  const initialInputRef = useRef<HTMLDivElement>(null);
  const finalOutputRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

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

  const setEquation = (id: number, value: string) => {
    setEquations((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    updateChain();
  }, [initialValue, equations]);

  useEffect(() => {
    const svgContainer = document.getElementById("svg-lines");
    if (svgContainer) {
      svgContainer.innerHTML = ""; // Clear previous lines
    }

    const drawStraightLine = (
      startElement: HTMLDivElement,
      endElement: HTMLDivElement
    ) => {
      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        const x1 = startRect.right;
        const y1 = startRect.top + startRect.height / 2;
        const x2 = endRect.left;
        const y2 = endRect.top + endRect.height / 2;

        const line1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line1.setAttribute("x1", x1.toString());
        line1.setAttribute("y1", y1.toString());
        line1.setAttribute("x2", x2.toString());
        line1.setAttribute("y2", y1.toString()); // Horizontal line
        line1.setAttribute("stroke", "#0066FF");
        line1.setAttribute("stroke-width", "4");
        line1.setAttribute("stroke-opacity", "0.5");
        line1.setAttribute("stroke-linecap", "round");

        const line2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line2.setAttribute("x1", x2.toString());
        line2.setAttribute("y1", y1.toString());
        line2.setAttribute("x2", x2.toString());
        line2.setAttribute("y2", y2.toString()); // Vertical line
        line2.setAttribute("stroke", "#0066FF");
        line2.setAttribute("stroke-width", "4");
        line2.setAttribute("stroke-opacity", "0.5");
        line2.setAttribute("stroke-linecap", "round");

        svgContainer?.appendChild(line1);
        svgContainer?.appendChild(line2);
      }
    };

    const drawOffsetHorizontalLine = (
      startElement: HTMLDivElement | null,
      endElement: HTMLDivElement | null,
      offsetStartElem: number,
      offsetEndElem: number
    ) => {
      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        // Calculate coordinates for a horizontal line with an offset
        const x1 = startRect.left + startRect.width / 2;
        const y1 = startRect.bottom - offsetStartElem;
        const x2 = endRect.left + endRect.width / 2;
        const y2 = endRect.bottom - offsetEndElem;

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

        svgContainer?.appendChild(line);
      }
    };

    drawOffsetHorizontalLine(
      initialInputRef.current,
      cardRefs.current[0],
      10,
      25
    );
    drawStraightLine(cardRefs.current[0], cardRefs.current[1]);
    drawStraightLine(cardRefs.current[1], cardRefs.current[3]);
    drawOffsetHorizontalLine(
      cardRefs.current[3],
      cardRefs.current[4],
      125,
      125
    );
    drawStraightLine(cardRefs.current[4], cardRefs.current[2]);
    drawOffsetHorizontalLine(
      cardRefs.current[2],
      finalOutputRef.current,
      25,
      10
    );
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
          <div ref={(el) => (cardRefs.current[0] = el as HTMLDivElement)}>
            <FunctionCard
              id={1}
              equation={equations[1]}
              setEquation={setEquation}
              output={outputs[1]}
              nextFunction="2"
            />
          </div>
        </div>

        <div ref={(el) => (cardRefs.current[1] = el as HTMLDivElement)}>
          <FunctionCard
            id={2}
            equation={equations[2]}
            setEquation={setEquation}
            output={outputs[2]}
            nextFunction="4"
          />
        </div>

        <div className="flex gap-4 items-end">
          <div ref={(el) => (cardRefs.current[2] = el as HTMLDivElement)}>
            <FunctionCard
              id={3}
              equation={equations[3]}
              setEquation={setEquation}
              output={outputs[3]}
              nextFunction="-"
            />
          </div>

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
                className="text-black text-lg font-bold focus:outline-none py-2 px-3 rounded-xl-full  bg-[transparent]  w-[65px] border-[#C5F2DA] border-l-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-36">
        <div ref={(el) => (cardRefs.current[3] = el as HTMLDivElement)}>
          <FunctionCard
            id={4}
            equation={equations[4]}
            setEquation={setEquation}
            output={outputs[4]}
            nextFunction="5"
          />
        </div>
        <div ref={(el) => (cardRefs.current[4] = el as HTMLDivElement)}>
          <FunctionCard
            id={5}
            equation={equations[5]}
            setEquation={setEquation}
            output={outputs[5]}
            nextFunction="3"
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionChain;

const Connector = ({
  size = 50,
  innerColor = "#0066FF",
  outerColor = "#B0B0B0",
  opacity = 0.3,
}) => {
  const outerRadius = size * 0.4; // Outer ring radius
  const innerRadius = size * 0.2; // Inner circle radius
  const strokeWidth = Math.max(1, size * 0.1); // Adjust stroke width for small sizes
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        stroke={outerColor}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={opacity}
      />

      {/* Inner solid circle */}
      <circle cx={center} cy={center} r={innerRadius} fill={innerColor} />
    </svg>
  );
};
