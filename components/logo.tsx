import * as React from "react";

const Logo = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} {...props}>
    <defs>
      <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="0%"
          style={{
            stopColor: "#e50914",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#cb020c",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <path fill="url(#a)" d="m0 0 50 100L100 0z" />
    <text
      x={50}
      y={65}
      fontFamily="Arial, sans-serif"
      fontSize={50}
      fontWeight="bold"
      fill="#fff"
      textAnchor="middle"
    >
      {"N"}
    </text>
  </svg>
);

export default Logo;
