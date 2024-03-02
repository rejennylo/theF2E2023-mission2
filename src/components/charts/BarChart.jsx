import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";

export const BarChart = ({ data }) => {
  const containerRef = useRef(null); // 用來參考父元素的 ref
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const margin = { top: 20, right: 0, bottom: 30, left: 60 };
  const noMarginWidth = parentSize.width - margin.left - margin.right;
  const noMarginHeight = parentSize.height - margin.top - margin.bottom;
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // 確保容器存在並已被渲染
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) {
          return;
        }
        // 將容器的寬高解構賦值給 width & height 並塞入 state 中
        const { width, height } = entries[0].contentRect;
        setParentSize({ width, height });
      });

      resizeObserver.observe(containerRef.current); // 透過 useRef 監聽父元素的大小變化，呼叫 resizeObserver 執行回調函數

      return () => {
        resizeObserver.disconnect(); // 停止監聽元素
      };
    }
  }, [containerRef]); // 關注 containerRef 是否改變，改變就會執行 useEffect

  // 設定 x 軸 年份 比例尺
  const xScale1 = d3
    .scaleBand() // 將 xScale1 定義為分類軸（年份）
    .rangeRound([0, noMarginWidth]) // 設置輸出範圍，最大值為 svg 寬
    .paddingInner(0.1) // 設定軸間距
    .domain(data.map((d) => d.year)); // 將年份資料帶入，定義類別數量

  // 設定 x 軸 票數 比例尺
  const xScale2 = d3
    .scaleBand() // 將 xScale2 定義為分類軸（候選人票數）
    .padding(0.2) // 軸間距
    .domain(data[0].candidate) // 將候選人資料帶入，定義候選人數量
    .rangeRound([0, xScale1.bandwidth()]); // 設置輸出範圍，最大值為 xScale1 的寬度

  // 定義 y 軸比例尺
  const yScale = d3
    .scaleLinear() // 將 y 定義為變量軸
    .domain([0, d3.max(data, (d) => d3.max(d.values))]) // 將value帶入，定義 y 軸最大值
    .range([noMarginHeight, 0]) // 設置輸出範圍，最大值為 svg 的高
    .nice(); // 優化刻度

  // 計算軸的刻度
  const xAxisTicks = data.map((d) => d.year);
  const yAxisTicks = yScale.ticks(3).map((tick) => ({
    value: tick,
    yOffset: yScale(tick),
  }));

  let setTimeoutId;

  // 滑鼠滑過顯示
  const showTooltip = (event, data) => {
    clearTimeout(setTimeoutId);

    const content = [data].map((d, i) => {
      return (
        <div key={i}>
          <span className="text-lg font-semibold text-primary-gray">
            {d.year} 年投票數
          </span>
          <ul>
            {[0, 1, 2].map((i) => {
              return (
                <li key={i} className="flex justify-between gap-2">
                  <span>
                    <span
                      className={`mr-2 inline-block h-3 w-3 rounded-full ${d.bgColor[i]}`}
                    ></span>
                    <span>{d.partyName[i]}</span>
                  </span>
                  <span>{d.values[i]}票</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
    setTooltip({
      visible: true,
      content: content,
      x: event.clientX,
      y: event.clientY - 100,
    });
  };

  // 滑鼠離開關閉
  const hideTooltip = () => {
    setTimeoutId = setTimeout(() => {
      setTooltip({ ...tooltip, visible: false });
    }, 500);
  };

  return (
    <div ref={containerRef} className="h-full w-full min-w-[500px]">
      <svg width={parentSize.width} height={parentSize.height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* 分類軸（x軸） */}
          <g transform={`translate(0,${noMarginHeight})`}>
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
                <line x2={noMarginWidth} className="stroke stroke-gray-200" />
                {/* y軸隔線 */}
                <text x="-10" y="0" dy=".32em" textAnchor="end">
                  {tick.value / 10000}萬
                </text>
              </g>
            ))}
          </g>
          {data.map((d) => (
            <g
              key={d.year}
              transform={`translate(${xScale1(d.year)},0)`}
              onMouseEnter={(e) => showTooltip(e, d)}
              onMouseLeave={hideTooltip}
            >
              {d.values.map((value, i) => (
                <rect
                  key={d.candidate[i]}
                  x={xScale2(d.candidate[i])}
                  y={yScale(Math.max(0, value))} // 如果 yScale < 0，取 0 為基準，確保 y 不會為負數
                  width={xScale2.bandwidth()}
                  height={Math.abs(yScale(value) - yScale(0))} // 確保為值為正
                  className={d.fillColor[i]}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
      {tooltip.visible && (
        <div
          className="absolute w-[230px] rounded-lg border bg-white p-3"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};
