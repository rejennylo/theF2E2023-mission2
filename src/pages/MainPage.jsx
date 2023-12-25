import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import MapChart from "../components/charts/MapChart";
import {
  partyVotesData,
  partysData,
  votesPercentageData,
  totalVotes,
  lineChartData,
  citiesData
} from "../data/dummyData";
import topoJsonPath from "../data/map-json/COUNTY_MOI_1090820.json";
import Cities from "../components/Cities";

const MainPage = () => {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <aside className="hidden lg:block lg:grow">
          <MapChart topoJSON={topoJsonPath} />
        </aside>
        <main className="flex w-full flex-col gap-5 px-5 pt-5 lg:w-3/4">
          <Candidate
            votesPercentageData={votesPercentageData}
            totalVotes={totalVotes}
          />
          <PartyVotes
            partyVotesData={partyVotesData}
            lineChartData={lineChartData}
            partys={partysData}
          />
          <Cities citiesData={citiesData} />
        </main>
      </div>
    </>
  );
};

export default MainPage;
