import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { MapChart } from "../components/charts/MapChart";
import { citiesData } from "../data/dummyData";
import topoJsonPath from "../data/map-json/COUNTY_MOI_1090820.json";
import Cities from "../components/Cities";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const { year } = useParams(); // 將 useParams 取得的資料解構賦值給 year
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedCity, setSelectedCity] = useState("全國");
  const [jsonData, setJsonData] = useState();
  const years = [2016, 2020];

  useEffect(() => {
    const fetchDataForFile = async (name) => {
      const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
      const yearPromises = years.map((year) =>
        axios
          .get(`src/data/vote-json/${year}/${name}.json`)
          .then((res) => ({ [year]: res.data })),
      );
      return Promise.all(yearPromises);
    };
    const getData = async () => {
      try {
        const fileName = ["elbase", "elcand", "elctks", "elpaty", "elprof"];

        // 為每個檔案名創建請求的 Promise
        const filePromises = fileName.map(
          (name) =>
            fetchDataForFile(name).then((yearlyData) => ({
              [name]: Object.assign({}, ...yearlyData),
            })), // 合併每個年份的資料到一個物件中
        );

        // 等待所有檔案的請求完成
        const results = await Promise.all(filePromises);

        // 將資料組合成一個物件
        const dataByFileName = results.reduce((acc, current) => ({
          ...acc,
          ...current,
        }));

        setJsonData(dataByFileName);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  if (!jsonData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="fade-animation">Loading...</p>
      </div>
    );
  }

  // 所有縣市資料
  const cities = jsonData.elbase[selectedYear].filter(
    (city) => city[2] === "00" && city[3] === "000" && city[5] !== "福建省",
  );

  // 選到的縣市資料
  const cityIs = cities.filter((city) => city[5] === selectedCity);

  // 縣市投票概況
  const cityVoteData = jsonData.elprof[selectedYear]
    .filter((item) => item[2] === "00" && item[3] === "000")
    .filter(
      (item) =>
        item[0] === cityIs[0][0] &&
        item[1] === cityIs[0][1] &&
        item[2] === cityIs[0][2] &&
        item[3] === cityIs[0][3],
    );

  // 投票率
  const isTotalVoteData = {
    投票數: cityVoteData[0][8],
    投票率: cityVoteData[0][17],
    有效票數: cityVoteData[0][6],
    無效票數: cityVoteData[0][7],
  };

  // 候選人所有資料
  const votesData = (jsonData, year, city) => {
    // 圖片資料
    const colorImageData = [
      {
        fillColor: "fill-role-blue",
        bgColor: "bg-role-blue",
        strokeColor: "stroke-role-blue",
        image: "./figures/person_vampire_3d_default 1.png",
        partyName: "中國國民黨",
      },
      {
        fillColor: "fill-role-orange",
        bgColor: "bg-role-orange",
        strokeColor: "stroke-role-orange",
        image: "./figures/man_elf_3d_medium-light 1.png",
        partyName: "親民黨",
      },
      {
        fillColor: "fill-role-green",
        bgColor: "bg-role-green",
        strokeColor: "stroke-role-green",
        image: "./figures/troll_3d 1.png",
        partyName: "民主進步黨",
      },
      {
        fillColor: "fill-role-orange",
        bgColor: "bg-role-orange",
        strokeColor: "stroke-role-orange",
        image: "./figures/man_genie_3d 1.png",
        partyName: "新黨",
      },
      {
        fillColor: "fill-secondary-gray",
        bgColor: "bg-secondary-gray",
        strokeColor: "stroke-secondary-gray",
        image: "./figures/woman_supervillain_3d_default 1.png",
        partyName: "連署",
      },
      {
        fillColor: "fill-secondary-gray",
        bgColor: "bg-secondary-gray",
        strokeColor: "stroke-secondary-gray",
        image: "./figures/person_mage_3d_default 1.png",
        partyName: "無",
      },
    ];

    // 政黨基本資料(elpaty)：
    const partyData = jsonData.elpaty[year].map((item) => {
      return { partyNumber: item[0], partyName: item[1] };
    });

    // 候選人資料
    const candidateData = jsonData.elcand[year]
      .filter((item) => item[15] !== "Y")
      .map((nameItem) => {
        const partyItem = partyData.find(
          (partyItem) => partyItem.partyNumber === nameItem[7],
        );
        const colorImage = colorImageData.find(
          (colorItem) => colorItem.partyName === partyItem.partyName,
        );
        return {
          ...partyItem,
          ...colorImage,
          number: nameItem[5],
          name: nameItem[6],
        };
      });

    // 縣市候選人得票
    const getVotesCityData = jsonData.elctks[year]
      .filter((item) => item[2] === "00" && item[3] === "000")
      .filter(
        (item) =>
          item[0] === city[0][0] &&
          item[1] === city[0][1] &&
          item[2] === city[0][2] &&
          item[3] === city[0][3],
      );

    // 整理後的年度總統得票資料
    const result = getVotesCityData.map((data, i) => {
      return {
        ...candidateData[i],
        votes: data[7],
        value: data[8],
        selected: data[9],
        year: year,
      };
    });
    return result;
  };

  const isVotesData = votesData(jsonData, selectedYear, cityIs);

  // 長條圖資料
  const barChartData = years.map((year) => {
    const data = votesData(jsonData, year, cityIs);
    return {
      year: year,
      candidate: data.map((d) => d.name),
      values: data.map((d) => d.votes),
      color: data.map((d) => d.fillColor),
    };
  });

  const lindData = (jsonData, years, city) => {
    const isVotesData = years
      .map((year) => votesData(jsonData, year, city))
      .flat();
    const yearValues = isVotesData.map((data) => {
      return {
        partyName: data.partyName,
        values: { year: data.year, value: data.value },
      };
    });

    const partyValues = isVotesData.map((data) => {
      const values = yearValues
        .map((item) => {
          if (item.partyName === data.partyName) {
            return item.values;
          }
        })
        .filter((item) => item !== undefined);

      return {
        partyName: data.partyName,
        values: [...values],
        fillColor: data.fillColor,
        strokeColor: data.strokeColor,
      };
    });

    const result = partyValues.filter((item, index, arr) => {
      return arr.findIndex((s) => item.partyName === s.partyName) === index;
    });

    return result;
  };

  const lineChartData = lindData(jsonData,years,cityIs);

  return (
    <div className="flex h-screen flex-col">
      <Header
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        className="flex-shrink-0"
        cities={cities}
      />
      <div className="flex h-full w-full overflow-hidden">
        <aside className="hidden lg:block lg:w-[30%] lg:shrink-0">
          <MapChart topoJSON={topoJsonPath} />
        </aside>
        <div className="flex-grow overflow-auto ">
          <main className="gap-5 px-5 pt-5">
            <Candidate
              isTotalVoteData={isTotalVoteData}
              isVotesData={isVotesData}
            />
            <PartyVotes
              barChartData={barChartData}
              isVotesData={isVotesData}
              lineChartData={lineChartData}
            />
            <Cities citiesData={citiesData} />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
