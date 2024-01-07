import logoTitle from "/logo_title@1x.png";
import { ReactComponent as IconFb } from "../assets/icon-fb.svg";
import { ReactComponent as IconIns } from "../assets/icon-ins.svg";
import { ReactComponent as IconYt } from "../assets/icon-yt.svg";

const Header = ({
  className,
  selectedYear,
  setSelectedYear,
  selectedCity,
  setSelectedCity,
  cities,
}) => {
  const years = [2016, 2020];
  const icons = [
    { icon: "分享", link: "#", style: "text-primary-gray" },
    { icon: <IconFb />, link: "https://www.facebook.com/", style: "" },
    { icon: <IconIns />, link: "https://www.instagram.com/", style: "" },
    { icon: <IconYt />, link: "https://www.youtube.com/", style: "" },
  ];

  return (
    <header id="header" className={`border ${className}`}>
      <nav name="header-wrap" className="flex w-full">
        <div className="w-full lg:flex">
          <div
            name="header-top"
            className="flex items-center justify-between px-5 py-2"
          >
            <div className="flex items-center">
              <h1>
                <a href="home">
                  <img src={logoTitle} alt="logo and title" />
                  <span className="hidden">台灣歷年總統 都幾？</span>
                </a>
              </h1>
            </div>
            <span className="ml-5 hidden font-bold text-primary-gray lg:inline-block">
              選擇年份
            </span>
            <select
              name="year"
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-8 rounded-full border-x-8 bg-gray-200 px-2 font-light lg:ml-3"
            >
              {years.map((n) => {
                return (
                  <option key={n} value={n}>
                    {n}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            name="header-area"
            className="flex items-center justify-between px-5 py-2 lg:w-[500px]"
          >
            <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-8 w-1/2 rounded-bl-full rounded-tl-full  border-x-8 bg-gray-200 font-light"
            >
              {cities.map((city, i) => {
                return (
                  <option key={i} value={city[5]}>
                    {city[5]}
                  </option>
                );
              })}
            </select>
            <select
              name="area"
              id="area"
              className="h-8 w-1/2 rounded-br-full rounded-tr-full border-x-8 bg-gray-200 font-light text-gray-400"
            >
              <option value="null">維護中</option>
            </select>
          </div>
        </div>
        <div name="sns-icons" className="my-auto hidden w-[180px] lg:block">
          <ul className="flex items-center gap-3">
            {icons.map((item, i) => {
              return (
                <li key={i} className={item.style}>
                  <a href={item.link}>{item.icon}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
