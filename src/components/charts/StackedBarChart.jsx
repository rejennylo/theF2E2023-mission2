import { useState, useEffect } from "react";
import * as d3 from "d3";

export const StackedBarChart = ({ svgWidth, svgHeight,data }) => {
  const [stackedData, setStackedData] = useState([]);
  const width = svgWidth;
  const height = svgHeight;

  useEffect(() => {
    // 使用堆疊
    const stack = d3
      .stack()
      .keys(["A", "B", "C"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack([
      { A: data[0].value, B: data[1].value, C: data[2].value },
    ]);
    setStackedData(series);
  }, [data]);

  // 比例尺
  const xScale = d3
    .scaleLinear()
    .domain([0, 100]) // 百分比
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(["stackedBar"])
    .range([0, height])

  return (
    <svg width={width} height={height}>
      <g>
        {stackedData.map((layer, i) => (
          <g key={i}>
            {layer.map((d, index) => (
              <g key={index}>
                <rect
                  x={xScale(d[0])}
                  y={yScale("stackedBar")}
                  width={xScale(d[1]) - xScale(d[0])}
                  height={yScale.bandwidth()}
                  className={data[i].fillColor}
                />
                <text className="fill-white" x={xScale(d[0])} y="15">
                  {data[i].value}%
                </text>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};
