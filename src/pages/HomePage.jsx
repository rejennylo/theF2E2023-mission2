import logo from "/logo@2x.png";
import chVampire from "/figures/person_vampire_3d_default 1.png";
import chSuperW from "/figures/woman_supervillain_3d_default 1.png";
import chTroll from "/figures/troll_3d 1.png";
import chMage from "/figures/person_mage_3d_default 1.png";
import chElf from "/figures/man_elf_3d_medium-light 1.png";
import chZombieW from "/figures/woman_zombie_3d 1.png";
import { ReactComponent as Title } from "../assets/title.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
  const chImages = [chVampire, chSuperW, chTroll, chMage, chElf, chZombieW];

  return (
    <div name="home" className="w-full">
      <div className="m-auto flex flex-col items-center overflow-hidden pt-[15vh]">
        <img src={logo} className="w-[140px]" />
        <h1 className="mt-5 text-4xl font-black text-primary-gray lg:text-6xl">
          <Title />
          <span className="hidden">台灣歷年總統 都幾？</span>
        </h1>
        <h3 className="my-5 text-2xl font-semibold text-primary-purple">
          選擇查詢年份
        </h3>
        <ul className="flex w-4/5 max-w-[925px] flex-wrap justify-between gap-3 lg:justify-start">
          {years.map((year) => {
            if (year <= 2012) {
              return (
                <li
                  key={year}
                  className="h-[45px] w-[48%] max-w-[175px] rounded-full bg-gray-200 text-secondary-gray"
                >
                  <a
                    href="#"
                    className="flex h-full w-full items-center justify-center"
                  >
                    <span className="inline-block font-semibold">{year}</span>
                  </a>
                </li>
              );
            }
            return (
              <li
                key={year}
                className="h-[45px] w-[48%] max-w-[175px] rounded-full bg-gray-200 hover:bg-primary-purple hover:text-white"
              >
                <Link
                  to={`/main/${year}`}
                  className="flex h-full w-full items-center justify-center"
                >
                  <span className="inline-block font-semibold">{year}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="absolute bottom-0 flex w-full justify-between overflow-hidden">
          {chImages.map((ch, i) => {
            return (
              <li
                key={i}
                className="mb-[-7px] w-[100px] flex-none lg:mb-[-20px] lg:w-[280px]"
              >
                <img src={ch} alt="image" className="object-center" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
