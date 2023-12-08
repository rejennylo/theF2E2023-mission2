import * as d3 from "d3";

export const BarChart = ({ data, svgWidth, svgHeight }) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 60 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // 設定 x 軸 年份 比例尺
  const xScale1 = d3
    .scaleBand() // 將 xScale1 定義為分類軸（年份）
    .rangeRound([0, width]) // 設置輸出範圍，最大值為 svg 寬
    .paddingInner(0.1) // 設定軸間距
    .domain(data.map((d) => d.year)); // 將年份資料帶入，定義類別數量

  // 設定 x 軸 票數 比例尺
  const xScale2 = d3
    .scaleBand() // 將 xScale2 定義為分類軸（候選人票數）
    .padding(0.1) // 軸間距
    .domain(data[0].candidate) // 將候選人資料帶入，定義候選人數量
    .rangeRound([0, xScale1.bandwidth()]); // 設置輸出範圍，最大值為 xScale1 的寬度

  // 定義 y 軸比例尺
  const yScale = d3
    .scaleLinear() // 將 y 定義為變量軸
    .domain([0, d3.max(data, (d) => d3.max(d.values))]) // 將value帶入，定義 y 軸最大值
    .range([height, 0]); // 設置輸出範圍，最大值為 svg 的高

  // 計算軸的刻度
  const xAxisTicks = data.map((d) => d.year);
  const yAxisTicks = yScale.ticks().map((tick) => ({
    value: tick,
    yOffset: yScale(tick),
  }));

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* 分類軸（x軸） */}
        <g transform={`translate(0,${height})`}>
          {xAxisTicks.map((tick, i) => (
            <text
              key={i}
              x={xScale1(tick) + xScale1.bandwidth() / 2}
              y={margin.bottom - 10}
              textAnchor="middle"
            >
              {tick}
            </text>
          ))}
        </g>
        {/* 變量軸（y軸） */}
        <g>
          {yAxisTicks.map((tick, i) => (
            <g key={i} transform={`translate(0,${tick.yOffset})`}>
              <line x2={width} className="stroke-gray-200 stroke" />
              {/* y軸隔線 */}
              <text x={-10} y={0} dy=".32em" textAnchor="end">
                {tick.value}萬
              </text>
            </g>
          ))}
        </g>
        {data.map((d) => (
          <g key={d.year} transform={`translate(${xScale1(d.year)},0)`}>
            {d.values.map((value, i) => (
              <rect
                key={d.candidate[i]}
                x={xScale2(d.candidate[i])}
                y={yScale(value)}
                width={xScale2.bandwidth()}
                height={height - yScale(value)}
                className={d.color[i]}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};
