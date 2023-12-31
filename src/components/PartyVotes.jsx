import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";

const Container = ({ children, partys, title }) => {
  return (
    <div
      name="party-votes-container"
      className="w-full rounded-xl border border-gray-200 p-5 lg:w-[45%] lg:grow"
    >
      <div
        name="title-area"
        className="mb-3 flex w-full items-center justify-between py-2"
      >
        <h3 className="text-lg font-semibold text-primary-gray">{title}</h3>
        <span name="party-tags">
          {partys.map((party, i) => {
            return (
              <span key={i} className="ml-2 md:ml-3">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${party.bgColor}`}
                ></span>
                <span className="ml-1 text-sm md:text-base">{party.partyName}</span>
              </span>
            );
          })}
        </span>
      </div>
      <div name="chart-area" className="h-[250px] w-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

const PartyVotes = ({ lineChartData, barChartData, isVotesData }) => {
  return (
    <section
      name="party-votes-wrap"
      className="flex w-full flex-col gap-3 lg:flex-row"
    >
      <Container title="歷屆政黨得票數" partys={isVotesData}>
        <BarChart data={barChartData} />
      </Container>
      <Container title="歷年政黨得票率" partys={isVotesData}>
        <LineChart data={lineChartData} />
      </Container>
    </section>
  );
};

export default PartyVotes;
