import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { MapChart } from "../components/charts/MapChart";
import topoJsonPath from "../data/map-json/COUNTY_MOI_1090820.json";
import Cities from "../components/Cities";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const { year } = useParams(); // 將 useParams 取得的資料解構賦值給 year
  const [selectedYear, setSelectedYear] = useState(year); // 當前選到的年份
  const [selectedCity, setSelectedCity] = useState("全國");
  const [jsonData, setJsonData] = useState();
  const years = [2016, 2020];
  const scrollRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const fetchDataForFile = async (name) => {
      const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
      const yearPromises = years.map((year) =>
        axios
          .get(`./vote-json/${year}/${name}.json`)
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
      fillColor: data.map((d) => d.fillColor),
      bgColor: data.map((d) => d.bgColor),
      partyName: data.map((d) => d.partyName),
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

  const lineChartData = lindData(jsonData, years, cityIs);

  // 圖片及顏色資料
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
  ];

  // 年度政黨基本資料
  const partyData = jsonData.elpaty[selectedYear].map((item) => {
    return { partyNumber: item[0], partyName: item[1] };
  });

  // 年度候選人資料
  const isyearCandidateData = jsonData.elcand[selectedYear]
    .filter((item) => item[15] !== "Y")
    .map((nameItem) => {
      const partyItem = partyData.find(
        (partyItem) => partyItem.partyNumber === nameItem[7],
      );
      const colorImage = colorImageData.find(
        (colorItem) => colorItem.partyName === partyItem.partyName,
      );
      return {
        year: year,
        ...partyItem,
        ...colorImage,
        number: nameItem[5],
        name: nameItem[6],
      };
    });

  // 原始資料(只保留縣市)
  const votes = jsonData.elctks[selectedYear].filter(
    (vote) => vote[2] === "00" && vote[3] === "000",
  );

  // 整理後的資料：
  const isyearVoteAllCityData = votes.map((vote) => {
    const city = cities.find(
      (city) =>
        city[0] === vote[0] &&
        city[1] === vote[1] &&
        city[2] === vote[2] &&
        city[3] === vote[3] &&
        city[4] === vote[4],
    );
    if (
      city[0] === vote[0] &&
      city[1] === vote[1] &&
      city[2] === vote[2] &&
      city[3] === vote[3] &&
      city[4] === vote[4]
    ) {
      return {
        year: year,
        city: city[5],
        number: vote[6],
        votes: vote[7],
        value: vote[8],
        selected: vote[9],
      };
    }
  });

  // 所有縣市
  const cityArray = cities
    .filter((c) => c[5] !== "全國" && c[5] !== "臺灣省" && c[5] !== "福建省")
    .map((city) => city[5]);

  // 所有縣市當選的選票資料
  const highestVote = cityArray.map((city) => {
    const data = isyearVoteAllCityData.filter((vote) => vote.city === city);
    const isHighest = data.reduce((max, current) => {
      return Number(current.votes) > Number(max.votes) ? current : max;
    });
    return isHighest;
  });

  // 比對當選資料與候選人名單，將候選人資料回傳並加入縣市方便之後篩選
  const selectedCandidate = highestVote.map((item) => {
    const candidate = isyearCandidateData.filter(
      (c) => item.number === c.number,
    );
    return { ...candidate[0], city: item.city };
  });
  // 堆疊長條圖的資料
  const dataForStacked = cityArray.map((city) => {
    // 單一縣市選票資料
    const dataOfCity = isyearVoteAllCityData.filter(
      (item) => item.city === city,
    );
    // 陣列）所有百分比，用於顯示堆疊長條圖
    const value = dataOfCity.map((item) => item.value);
    // 陣列）所有候選人名字，用於顯示堆疊長條圖
    const candidate = isyearCandidateData.map((item) => item.name);
    // 陣列）所有填色，用於顯示堆疊長條圖
    const fillColor = isyearCandidateData.map((item) => item.fillColor);
    const vote = dataOfCity.map((item) => parseInt(item.votes));

    return {
      city: city,
      candidate: candidate,
      value: value,
      fillColor: fillColor,
      votes: vote,
    };
  });

  // 最後的資料
  const citiesData = dataForStacked.map((item) => {
    const data = selectedCandidate.filter(
      (candidate) => item.city === candidate.city,
    );
    const vote = Math.max(...item.votes);

    return {
      city: item.city,
      candidate: item.candidate,
      value: item.value,
      votes: vote,
      fillColor: item.fillColor,
      name: data[0].name,
      bgColor: data[0].bgColor,
      image: data[0].image,
    };
  });

  // 捲動到頂部
  const scrollToTop = () => {
    const element = scrollRef.current;
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  };

  // 地圖開關
  const toggleMapVisible = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <div className="relative flex h-screen flex-col">
      {mapVisible && (
        <div name="map-wrap" className="absolute z-10 h-screen w-screen">
          <div className="h-full w-full bg-primary-gray opacity-40"></div>
          <div className="absolute left-1/2 top-1/2  h-[800px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-2xl bg-sky-200">
            <div className="flex items-center justify-between bg-white p-4">
              <span className="inline-block font-bold text-primary-gray">
                台灣地圖
              </span>
              <span>
                <img
                  src="./cancel.png"
                  alt="icon"
                  onClick={toggleMapVisible}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div className="h-[675px] w-full">
              <MapChart
                topoJSON={topoJsonPath}
                selectedCandidate={selectedCandidate}
                selectedYear={selectedYear}
                setSelectedCity={setSelectedCity}
                translate={[2.4, 2.9]}
                size={10000}
              />
            </div>
            <div className="flex items-center justify-center bg-white p-4">
              <span
                className="cursor-pointer rounded-xl bg-primary-purple px-10 py-2 text-white"
                onClick={toggleMapVisible}
              >
                確定
              </span>
            </div>
          </div>
        </div>
      )}
      <Header
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        className="flex-shrink-0"
        cities={cities}
      />
      <div className="relative flex h-full w-full flex-col overflow-hidden lg:flex-row">
        <span
          name="icon"
          className="h-15 w-15 absolute bottom-10 right-10"
          onClick={scrollToTop}
        >
          <img src="./icon_button.png" alt="icon" />
        </span>
        <aside className="relative lg:w-[30%] lg:shrink-0">
          <span className="absolute h-full w-full bg-primary-gray opacity-30 lg:hidden"></span>
          <div className="h-[150px] w-full overflow-hidden bg-sky-100 lg:h-screen">
            <MapChart
              topoJSON={topoJsonPath}
              selectedCandidate={selectedCandidate}
              selectedYear={selectedYear}
              setSelectedCity={setSelectedCity}
              translate={[1.7, 2]}
              size={12000}
            />
          </div>
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-xl bg-primary-purple px-4 py-2 text-white lg:hidden"
            onClick={toggleMapVisible}
          >
            進入地圖
          </span>
        </aside>
        <div className="flex-grow overflow-auto">
          <main className="gap-5 px-5 pt-5">
            <Candidate
              isTotalVoteData={isTotalVoteData}
              isVotesData={isVotesData}
              scrollRef={scrollRef}
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
