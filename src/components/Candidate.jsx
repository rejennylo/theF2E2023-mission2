import { StackedBarChart } from "../components/charts/StackedBarChart";

const Card = ({ image, party, name, votes, color }) => {
  return (
    <div name="card" className="mb-3 flex">
      <span
        className={`h-[68px] w-[68px] overflow-hidden rounded-2xl ${color}`}
      >
        <img src={image} alt="image" className="h-auto w-auto mt-1" />
      </span>
      <span className="ml-3 flex flex-col">
        <span className="text-sm text-secondary-gray">{party}</span>
        <span>{name}</span>
        <span>{votes} 票</span>
      </span>
    </div>
  );
};

const Candidate = ({ votesPercentageData }) => {
  return (
    <section
      name="candidata-wrap"
      className="w-full rounded-xl bg-gray-200 p-5"
    >
      <h3 className="mb-3 py-2 text-xl font-semibold text-primary-gray">
        總統得票數
      </h3>
      <div className="mb-3 rounded-xl bg-white p-5">
        <div name="candidata-cards" className="mb-5">
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
        </div>
        <div className="flex justify-center overflow-hidden rounded-full">
            <StackedBarChart
              data={votesPercentageData}
            />
        </div>
      </div>
      <div className="rounded-xl bg-white">圖表二</div>
    </section>
  );
};

export default Candidate;
