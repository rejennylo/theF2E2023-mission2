import { StackedBarChart } from "../components/charts/StackedBarChart";
import { DonutChart } from "./charts/DonutChart";

const Card = ({ image, partyName, name, votes, bgColor, selected }) => {
  const check = selected === "*" ? "block" : "hidden";

  return (
    <li name="card" className="mb-3 flex">
      <span
        className={`h-[68px] w-[68px] overflow-hidden rounded-2xl ${bgColor}`}
      >
        <img src={image} alt="image" className="mt-1 h-auto w-auto" />
      </span>
      <span className="ml-3 flex flex-col">
        <span className="text-[14px] text-secondary-gray">{partyName}</span>
        <span>
          {name}
          <img src="./check_circle.png" alt="selected" className={`inline-block ${check}`} />
        </span>
        <span className="text-sm">
          {parseInt(votes, 10).toLocaleString()} 票
        </span>
      </span>
    </li>
  );
};

const Candidate = ({ isTotalVoteData, isVotesData, scrollRef }) => {
  return (
    <section
      name="candidate"
      className="mb-5 w-full rounded-xl bg-gray-200 p-5"
      ref={scrollRef}
    >
      <h3 className="mb-3 py-2 text-xl font-semibold text-primary-gray">
        總統得票數
      </h3>
      <div className="lg:flex lg:h-auto lg:gap-3">
        <div
          name="candidate-warp"
          className="mb-5 lg:mb-0 gap-5 rounded-xl bg-white p-5 lg:w-[60%]"
        >
          <ul
            name="candidate-cards"
            className="mb-5 sm:flex flex-wrap justify-between gap-2 xl:flex-nowrap"
          >
            {isVotesData.map((data) => {
              return (
                <Card
                  key={data.name}
                  image={data.image}
                  partyName={data.partyName}
                  name={data.name}
                  votes={data.votes}
                  bgColor={data.bgColor}
                  selected={data.selected}
                />
              );
            })}
          </ul>
          <div className="flex justify-center overflow-hidden rounded-full">
            <StackedBarChart data={isVotesData} />
          </div>
        </div>
        <div
          name="vote-rate-wrap"
          className="flex flex-wrap justify-center items-center gap-5 sm:gap-10  lg:gap-3 rounded-xl bg-white p-5 lg:w-[40%] lg:justify-start"
        >
          <div className="flex h-[150px] w-auto items-center justify-center sm:h-[200px] lg:h-[140px]">
            <DonutChart data={parseFloat(isTotalVoteData["投票率"], 10)} />
          </div>
          <ul className="w-1/2 grow sm:flex sm:flex-wrap">
            {Object.keys(isTotalVoteData).map((item, i) => {
              const itemValue = parseInt(isTotalVoteData[item], 10);
              return (
                <li key={i} className="my-1 text-secondary-gray sm:w-1/2">
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
