import logoTitle from "/logo_title@1x.png";
import { ReactComponent as IconFb } from "../assets/icon-fb.svg";
import { ReactComponent as IconIns } from "../assets/icon-ins.svg";
import { ReactComponent as IconYt } from "../assets/icon-yt.svg";

const Header = ({ className }) => {
  const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
  const icons = [
    { icon: "分享", link: "#", style: "text-primary-gray" },
    { icon: <IconFb />, link: "#", style: "" },
    { icon: <IconIns />, link: "#", style: "" },
    { icon: <IconYt />, link: "#", style: "" },
  ];
  const cities = [
    { id: "NULL", name: "請選擇縣市" },
    { id: "KLU", name: "基隆市" },
    { id: "TPH", name: "新北市" },
    { id: "TPE", name: "臺北市" },
    { id: "TYC", name: "桃園市" },
    { id: "HSH", name: "新竹縣" },
    { id: "HSC", name: "新竹市" },
    { id: "MAC", name: "苗栗市" },
    { id: "MAL", name: "苗栗縣" },
    { id: "TXG", name: "臺中市" },
    { id: "CWH", name: "彰化縣" },
    { id: "CWS", name: "彰化市" },
    { id: "NTC", name: "南投市" },
    { id: "NTO", name: "南投縣" },
    { id: "YLH", name: "雲林縣" },
    { id: "CHY", name: "嘉義縣" },
    { id: "CYI", name: "嘉義市" },
    { id: "TNN", name: "臺南市" },
    { id: "KHH", name: "高雄市" },
    { id: "IUH", name: "屏東縣" },
    { id: "PTS", name: "屏東市" },
    { id: "ILN", name: "宜蘭縣" },
    { id: "ILC", name: "宜蘭市" },
    { id: "HWA", name: "花蓮縣" },
    { id: "HWC", name: "花蓮市" },
    { id: "TTC", name: "臺東市" },
    { id: "TTT", name: "臺東縣" },
    { id: "PEH", name: "澎湖縣" },
    { id: "KMN", name: "金門縣" },
    { id: "LNN", name: "連江縣" },
  ];
  return (
    <header className={className}>
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
              className="h-8 w-1/2 rounded-bl-full rounded-tl-full  border-x-8 bg-gray-200 font-light"
            >
              {/* <option value="">全部縣市</option> */}
              {cities.map((city) => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            <select
              name="area"
              id="area"
              className="h-8 w-1/2 rounded-br-full rounded-tr-full border-x-8 bg-gray-200 font-light"
            >
              <option value="">選擇區域</option>
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
