import logo from '/logo@2x.png';
import chVampire from '/figures/person_vampire_3d_default 1.png';
import chSuperW from '/figures/woman_supervillain_3d_default 1.png';
import chTroll from '/figures/troll_3d 1.png';
import chMage from '/figures/person_mage_3d_default 1.png';
import chElf from '/figures/man_elf_3d_medium-light 1.png';
import chZombieW from '/figures/woman_zombie_3d 1.png';
import { ReactComponent as Title } from '../assets/title.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const years = [1996, 2000, 2004, 2008, 2012, 2016, 2020];
  const chImages = [chVampire, chSuperW, chTroll, chMage, chElf, chZombieW];

  return (
    <div name="home" className="w-full">
      <div className="m-auto flex flex-col items-center overflow-hidden pt-[15vh]">
        <img src={logo} className="w-[140px]" />
        <h1 className="text-4xl lg:text-6xl font-black text-primary-gray mt-5">
          <Title />
          <span className='hidden'>台灣歷年總統 都幾？</span>
        </h1>
        <h3 className="text-2xl font-semibold text-primary-purple my-5">
          選擇查詢年份
        </h3>
        <ul className="flex flex-wrap justify-between gap-3 w-4/5 max-w-[925px] lg:justify-start">
          {years.map((year) => {
            return (
              <li
                key={year}
                className="h-[45px] w-[48%] max-w-[175px] rounded-full bg-gray-200 hover:bg-primary-purple hover:text-white"
              >
                <Link
                  to="/main"
                  className="w-full h-full flex justify-center items-center"
                >
                  <span className="inline-block font-semibold">{year}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="w-full flex absolute bottom-0 overflow-hidden justify-between">
          {chImages.map((ch, i) => {
            return (
              <li
                key={i}
                className="w-[100px] lg:w-[280px] mb-[-7px] lg:mb-[-20px] flex-none"
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
