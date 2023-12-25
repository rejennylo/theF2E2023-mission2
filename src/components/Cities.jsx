import { CityBarChart } from "../components/charts/CityBarChart";

const Card = ({ data }) => {
  return (
    <li className="pt-3 flex w-full border-b hover:bg-gray-100">
      <span className="w-1/5 font-bold text-primary-gray">{data.city}</span>
      <span className="flex grow flex-col">
        <span className="mb-3 flex items-center">
          <span className="text-secondary-gray">候選人</span>
          <span className={`mx-2 overflow-hidden rounded-full ${data.bgColor}`}>
            <img src={data.image} alt="image" className="h-[30px] w-[30px]" />
          </span>
          <span>{data.name}</span>
        </span>
        <span className="rounded-xl overflow-hidden mb-5">
          <CityBarChart data={data} />
        </span>
      </span>
      <span className="px-5 font-bold text-secondary-gray">{`>`}</span>
    </li>
  );
};

const Cities = ({ citiesData }) => {
  return (
    <section name="cities" className="w-full p-5">
      <h3 className="mb-3 py-2 text-xl font-semibold text-primary-gray">
        各縣市投票總覽
      </h3>
      <div className="w-full">
        <div name="bar-warp" className="rounded-md bg-gray-200 py-2">
          <span className="px-2">地區</span>
        </div>
        <ul name="candidate-warp" className="mb-3 w-full bg-white py-3">
          {citiesData.map((city, i) => (
            <Card key={i} data={city} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Cities;
