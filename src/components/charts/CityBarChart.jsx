import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export const CityBarChart = ({ data }) => {
  const containerRef = useRef(null); // 用來參考父元素的 ref
  const [stackedData, setStackedData] = useState([]);
  const [parentSize, setParentSize] = useState({ width: 100, height: 10 });

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

  useEffect(() => {
    // 建立變數儲存候選人名稱，用於 stack
    const keys = [data.name[0], data.name[1], data.name[2]];
    const stack = d3
      .stack() // 建立堆疊
      .keys(keys) // 將剛剛的 keys 放入，定義每個 stack layer 的 key
      .order(d3.stackOrderNone) // 無順序
      .offset(d3.stackOffsetNone); // 無偏移

    // 處理堆疊圖的資料，這裡的 key 需和 stack.keys 互相對應
    const series = stack([
      {
        [keys[0]]: data.value[0],
        [keys[1]]: data.value[1],
        [keys[2]]: data.value[2],
      },
    ]);

    setStackedData(series); // 更新 state
  }, [data]); // 關注 data 變化

  // 比例尺
  const xScale = d3
    .scaleLinear()
    .domain([0, 100]) // 百分比
    .range([0, parentSize.width]);

  const yScale = d3
    .scaleBand()
    .domain(["stackedBar"])
    .range([0, parentSize.height]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <svg width={parentSize.width} height={parentSize.height}>
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
                    className={data.fillColor[i]}
                  />
                </g>
              ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
