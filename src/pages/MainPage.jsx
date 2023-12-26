import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { MapChart } from "../components/charts/MapChart";
import {
  partyVotesData,
  partysData,
  votesPercentageData,
  totalVotes,
  lineChartData,
  citiesData,
} from "../data/dummyData";
import topoJsonPath from "../data/map-json/COUNTY_MOI_1090820.json";
import Cities from "../components/Cities";
import Footer from "../components/Footer";

const MainPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header className="flex-shrink-0" />
      <div className="flex h-full w-full overflow-hidden">
        <aside className="hidden lg:block lg:w-[30%] lg:shrink-0">
          <MapChart topoJSON={topoJsonPath} />
        </aside>
        <div className="flex-grow overflow-auto ">
          <main className="gap-5 px-5 pt-5">
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
