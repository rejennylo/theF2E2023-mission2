import { BarChart } from "./charts/BarChart";

const PartyVotes = ({ barChartData, partys }) => {
  return (
    <section
      name="party-votes-wrap"
      className="border-grap-200 w-full rounded-xl border p-5"
    >
      <div
        name="tatle-area"
        className="mb-3 flex w-full items-center justify-between py-2"
      >
        <h3 className="text-xl font-semibold text-primary-gray">
          歷屆政黨得票數
        </h3>
        <span name="party-tags">
          {partys.map((party, i) => {
            return (
              <span key={i} className="ml-3">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${party.color}`}
                ></span>
                <span className="ml-1">{party.name}</span>
              </span>
            );
          })}
        </span>
      </div>
      <div name="chart-area" className="w-full overflow-auto">
        <BarChart data={barChartData} svgWidth="500" svgHeight="234" />
      </div>
    </section>
  );
};

export default PartyVotes;
