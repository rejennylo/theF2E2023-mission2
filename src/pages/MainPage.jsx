import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { partyVotesData, partysData,votesPercentageData } from "../data/dummyData";

const MainPage = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 px-5 pt-5">
        <Candidate votesPercentageData={votesPercentageData} />
        <PartyVotes partyVotesData={partyVotesData} partys={partysData} />
      </main>
    </>
  );
};

export default MainPage;
