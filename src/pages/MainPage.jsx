import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import {
  partyVotesData,
  partysData,
  votesPercentageData,
  totalVotes,
  lineChartData,
} from "../data/dummyData";

const MainPage = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 px-5 pt-5">
        <Candidate
          votesPercentageData={votesPercentageData}
          totalVotes={totalVotes}
        />
        <PartyVotes
          partyVotesData={partyVotesData}
          lineChartData={lineChartData}
          partys={partysData}
        />
      </main>
    </>
  );
};

export default MainPage;
