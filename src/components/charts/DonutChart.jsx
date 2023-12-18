import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export const DonutChart = ({ percentage }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) {
        return;
      }
      if (containerRef.current) {
        const { height } = containerRef.current.getBoundingClientRect();
        setSize({ width: height, height }); // 確保為正圓
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  // 計算主要弧形
  const createArc = d3
    .arc()
    .innerRadius((size.width / 2) * 0.75) // 内半徑
    .outerRadius(size.width / 2) // 外半徑
    .startAngle(0) // 起始角度
    .endAngle(2 * Math.PI * (percentage / 100)); // 结束角度

  // 計算背景弧形
  const createBackgroundArc = d3
    .arc()
    .innerRadius((size.width / 2) * 0.75)
    .outerRadius(size.width / 2)
    .startAngle(2 * Math.PI * (percentage / 100))
    .endAngle(2 * Math.PI);

  return (
    <div ref={containerRef} className="h-[70%] lg:h-[95%]">
      <svg width={size.width} height={size.height}>
        <g transform={`translate(${size.width / 2}, ${size.height / 2})`}>
          <path d={createBackgroundArc()} className="fill-slate-200" />{" "}
          {/* 背景的圓 */}
          <path d={createArc()} className="fill-primary-purple" />{" "}
          {/* 前景的圓 */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dy="-.8em"
            className="fill-secondary-gray"
          >
            投票率
          </text>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dy=".8em"
            className="fill-primary-purple text-xl font-semibold"
          >
            {`${percentage.toFixed(1)}%`} {/* 取小數點後一位 */}
          </text>
        </g>
      </svg>
    </div>
  );
};
