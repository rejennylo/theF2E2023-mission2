import Header from "../components/Header";
import Candidate from "../components/Candidate";
import PartyVotes from "../components/PartyVotes";
import { barChartData, partys } from "../data/dummyData";

const MainPage = () => {
  return (
    <>
      <Header />
      <main className="pt-5 px-5 flex flex-col gap-5">
        <Candidate />
        <PartyVotes barChartData={barChartData} partys={partys} />
      </main>
    </>
  );
};

export default MainPage;
