import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { MapChart } from "../components/charts/MapChart";
import {
  partyVotesData,
  partysData,
  votesPercentageData,
  lineChartData,
  citiesData,
} from "../data/dummyData";
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

  // 候選人資料
  const candidateData = jsonData.elcand[selectedYear].filter(
    (item) => item[15] !== "Y",
  );

  // 所有投票概況
  const votesData = jsonData.elprof[selectedYear].filter(
    (item) => item[2] === "00" && item[3] === "000",
  );

  // 縣市投票概況
  const cityVoteData = votesData.filter(
    (item) =>
      item[0] === cityIs[0][0] &&
      item[1] === cityIs[0][1] &&
      item[2] === cityIs[0][2] &&
      item[3] === cityIs[0][3],
  );

  // 投票率
  const isVoteData = {
    投票數: cityVoteData[0][8],
    投票率: cityVoteData[0][17],
    有效票數: cityVoteData[0][6],
    無效票數: cityVoteData[0][7],
  };

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
              isVoteData={isVoteData}
              votesPercentageData={votesPercentageData}
            />
            <PartyVotes
              partyVotesData={partyVotesData}
              lineChartData={lineChartData}
              partys={partysData}
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
