import logoTitle from '/logo_title@1x.png';
import { ReactComponent as IconFb } from '../assets/icon-fb.svg';
import { ReactComponent as IconIns } from '../assets/icon-ins.svg';
import { ReactComponent as IconYt } from '../assets/icon-yt.svg';

export default function Header() {
  const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
  const icons = [
    { icon: '分享', link: '#', style: 'text-primary-gray' },
    { icon: <IconFb />, link: '#', style: '' },
    { icon: <IconIns />, link: '#', style: '' },
    { icon: <IconYt />, link: '#', style: '' },
  ];
  return (
    <header>
      <nav name="header-wrap" className="flex w-full">
        <div className="lg:flex w-full">
          <div
            name="header-top"
            className="flex items-center justify-between py-2 px-5"
          >
            <div className="flex items-center">
              <h1>
                <a href="home">
                  <img src={logoTitle} alt="logo and title" />
                  <span className="hidden">台灣歷年總統 都幾？</span>
                </a>
              </h1>
            </div>
            <span className="hidden lg:inline-block ml-5 font-bold text-primary-gray">
              選擇年份
            </span>
            <select
              name="year"
              id="year"
              className="h-8 rounded-full border-x-8 px-2 bg-gray-200 font-light lg:ml-3"
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
            className="flex items-center justify-between py-2 px-5 lg:w-[500px]"
          >
            <select
              name="city"
              id="city"
              className="w-1/2 h-8 rounded-tl-full rounded-bl-full  border-x-8 bg-gray-200 font-light"
            >
              <option value="">全部縣市</option>
            </select>
            <select
              name="area"
              id="area"
              className="w-1/2 h-8 rounded-tr-full rounded-br-full border-x-8 bg-gray-200 font-light"
            >
              <option value="">選擇區域</option>
            </select>
          </div>
        </div>
        <div name="sns-icons" className="w-[180px] hidden lg:block my-auto">
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
}
