import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import * as d3 from "d3";

const MapChart = ({ topoJSON }) => {
  const svgRef = useRef(null);
  // const [paths, setPaths] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // 定義地圖的寬高
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 800;

    // 創建投影
    const projection = d3
      .geoMercator()
      .center([120.9718, 23.9739]) // 台灣中心的經緯度
      .scale(12000)
      .translate([width / 2, height / 2]);

    // 創建路徑生成器
    const pathGenerator = d3.geoPath().projection(projection);

    const locations = feature(
      topoJSON,
      topoJSON.objects.COUNTY_MOI_1090820,
    ).features.map((d) => {
      const centroid = pathGenerator.centroid(d); // 計算中心點
      return {
        ...d.properties, // 擴展屬性資訊
        coordinates: centroid, // 各縣市中心點資訊
        d: pathGenerator(d), // 路徑描述
      };
    });

    setLocations(locations); // 將數據儲存到 state 中

    console.log(locations);

    // 移動畫面
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
        svg.selectAll("text").attr("transform", event.transform);
      });
    svg.call(zoom);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <svg ref={svgRef} className="h-full w-full">
        {locations.map((location, i) => (

            <path
              key={i}
              d={location.d}
              className="fill-role-blue stroke-gray-200 hover:stroke-white hover:stroke-2"
              // 如果需要，也可以傳遞其他地理特徵的屬性，例如 onClick 事件
            />

        ))}
        {locations.map((location, i) => (
          <text
            key={i}
            x={location.coordinates[0]}
            y={location.coordinates[1]}
            textAnchor="middle"
            dy=".8em"
            className="fill-white text-xs"
          >
            {location.COUNTYNAME}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default MapChart;
