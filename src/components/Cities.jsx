import { CityBarChart } from "../components/charts/CityBarChart";

const Card = ({ data }) => {
  return (
    <li className="flex w-full border-b pt-3 hover:bg-gray-100">
      <span className="w-[27%] min-w-[100px] font-bold text-primary-gray">
        {data.city}
      </span>
      <span className="flex w-full grow flex-col-reverse lg:flex-row lg:items-center">
        <span className="mb-5 h-[10px] w-[95%] overflow-hidden rounded-xl lg:w-[49%]">
          <CityBarChart data={data} />
        </span>
        <span className="mb-3 flex items-center lg:ml-[5%] lg:flex-grow lg:flex-row">
          <span className="inline-block text-secondary-gray lg:hidden">
            候選人
          </span>
          <span
            className={`mx-2 inline-block overflow-hidden rounded-full ${data.bgColor}`}
          >
            <img src={data.image} alt="image" className="h-[30px] w-[30px]" />
          </span>
          <span>{data.name}</span>
          <span className="hidden lg:ml-[19%] lg:block">{data.vote}</span>
        </span>
      </span>
      <span className="px-5 font-bold text-secondary-gray">{`>`}</span>
    </li>
  );
};

const Cities = ({ citiesData }) => {
  const top = [
    { text: "地區", style: "px-2 block lg:w-1/5" },
    { text: "得票率", style: "px-2 hidden lg:block w-2/5" },
    { text: "當選人", style: "px-2 hidden lg:block w-1/6" },
    { text: "得票數", style: "px-2 hidden lg:block w-1/6" },
  ];
  return (
    <section name="cities" className="mt-5 w-full p-2">
      <h3 className="mb-3 py-2 text-xl font-semibold text-primary-gray">
        各縣市投票總覽
      </h3>
      <div className="w-full">
        <div name="bar-warp" className="flex rounded-md bg-gray-200 py-2">
          {top.map((item, i) => (
            <span key={i} className={item.style}>
              {item.text}
            </span>
          ))}
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
