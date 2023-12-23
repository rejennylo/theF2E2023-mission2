import { StackedBarChart } from "../components/charts/StackedBarChart";
import { DonutChart } from "./charts/DonutChart";

const Card = ({ image, party, name, votes, color }) => {
  return (
    <li name="card" className="mb-3 flex">
      <span
        className={`h-[68px] w-[68px] overflow-hidden rounded-2xl ${color}`}
      >
        <img src={image} alt="image" className="mt-1 h-auto w-auto" />
      </span>
      <span className="ml-3 flex flex-col">
        <span className="text-sm text-secondary-gray">{party}</span>
        <span>{name}</span>
        <span>{parseInt(votes, 10).toLocaleString()} 票</span>
      </span>
    </li>
  );
};

const Candidate = ({ votesPercentageData, totalVotes }) => {
  return (
    <section name="candidate" className="w-full rounded-xl bg-gray-200 p-5">
      <h3 className="mb-3 py-2 text-xl font-semibold text-primary-gray">
        總統得票數
      </h3>
      <div className="lg:flex lg:h-auto  lg:gap-3">
        <div
          name="candidate-warp"
          className="mb-3 rounded-xl bg-white p-5 lg:mb-0 lg:w-1/2"
        >
          <ul name="candidate-cards" className="mb-5 lg:flex lg:justify-around">
            {votesPercentageData.map((data) => {
              return (
                <Card
                  key={data.name}
                  image={data.image}
                  party={data.party}
                  name={data.name}
                  votes={data.votes}
                  color={data.bgColor}
                />
              );
            })}
          </ul>
          <div className="flex justify-center overflow-hidden rounded-full">
            <StackedBarChart data={votesPercentageData} />
          </div>
        </div>
        <div
          name="vote-rate-wrap"
          className="flex justify-between rounded-xl bg-white p-5 lg:w-1/2 lg:justify-start"
        >
          <div className="flex w-auto items-center justify-center">
            <DonutChart percentage={Object.values(totalVotes)[1]} />
          </div>
          <ul className="ml-5 w-2/3 lg:flex lg:w-auto lg:flex-wrap">
            {Object.keys(totalVotes).map((item, i) => {
              const itemValue = totalVotes[item];
              return (
                <li
                  key={i}
                  className="pb-3 text-secondary-gray lg:w-1/2 lg:pb-1"
                >
                  {item}{" "}
                  <span className="block py-1 font-bold text-black">
                    {item !== "投票率"
                      ? itemValue.toLocaleString()
                      : itemValue + " %"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Candidate;
