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

export default Connector;
