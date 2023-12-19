import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";

export const LineChart = ({ data }) => {
  const containerRef = useRef(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const margin = { top: 10, right: 30, bottom: 60, left: 80 };

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) {
          return;
        }

        const { width, height } = entries[0].contentRect;
        setParentSize({ width, height });
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerRef]);

  // 提取所有年份
  const years = Array.from(
    new Set(data.flatMap((d) => d.values.map((v) => v.year))),
  );

  const xScale = d3
    .scalePoint()
    .domain(years)
    .range([margin.left, parentSize.width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.flatMap((d) => d.values.map((v) => v.value)))])
    .range([parentSize.height - margin.bottom, margin.top]);

  // y軸刻度
  const yAxis = yScale.ticks(5).map((tick) => ({
    value: tick,
    yOffset: yScale(tick),
  }));

  // 線的產生器
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  return (
    <div ref={containerRef} className="h-full w-full min-w-[500px]">
      <svg width={parentSize.width} height={parentSize.height}>
        <g transform={`translate(0,${margin.top})`}>
          <g
            transform={`translate(0,${
              parentSize.height - margin.top - margin.bottom
            })`}
          >
            {years.map((tick, i) => (
              <text
                key={i}
                x={xScale(tick)}
                y={margin.bottom - 10}
                textAnchor="middle"
              >
                {tick}
              </text>
            ))}
          </g>
          <g>
            {yAxis.map((tick, i) => (
              <g key={i} transform={`translate(60,${tick.yOffset})`}>
                <line
                  x2={parentSize.width - margin.left}
                  className="stroke stroke-gray-200"
                />
                <text x="-10" y="0" dy=".32em" textAnchor="end">
                  {tick.value}%
                </text>
              </g>
            ))}
          </g>
          {/* 線 */}
          {data.map((serie, index) => (
            <path
              key={index}
              d={lineGenerator(serie.values)}
              className={`fill-none stroke-2 ${serie.strokeColor}`}
            />
          ))}
          {/* 點 */}
          {data.map((serie, index) =>
            serie.values.map((point, pointIndex) => (
              <circle
                key={`${index}-${pointIndex}`}
                cx={xScale(point.year)}
                cy={yScale(point.value)}
                r="5"
                className={serie.fillColor}
              />
            )),
          )}
        </g>
      </svg>
    </div>
  );
};
