import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import * as d3 from "d3";
export const MapChart = ({
  topoJSON,
  selectedCandidate,
  selectedYear,
  setSelectedCity,
  translate,
  size
}) => {
  const svgRef = useRef(null);
  const [locations, setLocations] = useState([]);
  
  // 圖表
  useEffect(() => {
    // 定義地圖的寬高
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 800;

    // 創建投影
    const projection = d3
      .geoMercator() // 繪製投影
      .center([120.9718, 23.9739]) // 台灣中心的經緯度
      .scale(size) // 地圖縮放
      .translate([width / translate[0], height / translate[1]]); // 以中心點計算位移參數

    // 創建路徑生成器
    const pathGenerator = d3.geoPath().projection(projection);

    // 地圖資訊
    const locations = feature(
      topoJSON,
      topoJSON.objects.COUNTY_MOI_1090820,
    ).features.map((d) => {
      const centroid = pathGenerator.centroid(d); // 計算中心點
      const data = selectedCandidate.filter(
        (item) => item.city === d.properties.COUNTYNAME,
      )[0];

      return {
        ...d.properties, // 擴展屬性資訊
        coordinates: centroid, // 各縣市中心點資訊
        d: pathGenerator(d), // 路徑描述
        fillColor: data.fillColor,
      };
    });

    setLocations(locations); // 將數據儲存到 state 中
    // 移動畫面
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // 設定最大與最小縮放比例
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
        svg.selectAll("text").attr("transform", event.transform);
      });
    svg.call(zoom);
    
  }, [selectedYear]);

  return (
    // <div className="h-[150px] lg:h-screen w-full overflow-hidden bg-sky-100">
      <svg ref={svgRef} className="h-full w-full">
        {/* 地圖繪製 */}
        {locations.map((location, i) => (
          <g
            key={i}
            onClick={(e) =>
              setSelectedCity(e.target.getAttribute("name"))
            }
          >
            <path
              name={location.COUNTYNAME}
              d={location.d}
              className={`${locations[i].fillColor} relative cursor-pointer stroke-gray-200 hover:stroke-white hover:stroke-2`}
            />
          </g>
        ))}
        {/* 地圖文字 */}
        {locations.map((location, i) => (
          <g key={i} className="cursor-pointer text-[10px] font-extrabold">
            <text
              x={location.coordinates[0]}
              y={location.coordinates[1]}
              textAnchor="middle"
              dy=".8em"
              className="fill-white stroke-secondary-gray"
            >
              {location.COUNTYNAME}
            </text>
            <text
              x={location.coordinates[0]}
              y={location.coordinates[1]}
              textAnchor="middle"
              dy=".8em"
              className="fill-white"
            >
              {location.COUNTYNAME}
            </text>
          </g>
        ))}
      </svg>
    // </div>
  );
};
