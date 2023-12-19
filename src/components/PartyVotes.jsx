import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";

const Container = ({ children, partys, title }) => {
  return (
    <div
      name="party-votes-container"
      className="border-grap-200 w-full rounded-xl border p-5"
    >
      <div
        name="tatle-area"
        className="mb-3 flex w-full items-center justify-between py-2"
      >
        <h3 className="text-xl font-semibold text-primary-gray">{title}</h3>
        <span name="party-tags">
          {partys.map((party, i) => {
            return (
              <span key={i} className="ml-2 md:ml-3">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${party.color}`}
                ></span>
                <span className="ml-1 text-sm md:text-base">{party.name}</span>
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

const PartyVotes = ({ partyVotesData, lineChartData, partys }) => {
  return (
    <section
      name="party-votes-wrap"
      className="flex w-full flex-col gap-3 lg:flex-row"
    >
      <Container title="歷屆政黨得票率" partys={partys}>
        <BarChart data={partyVotesData} />
      </Container>
      <Container title="歷年政黨得票率" partys={partys}>
        <LineChart data={lineChartData} />
      </Container>
    </section>
  );
};

export default PartyVotes;
