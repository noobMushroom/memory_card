import { Image } from '../App';
import uuid from 'react-uuid';

interface GameOverScreenProps {
  level: number;
  highScore: number;
  pokemon: Image[];
  score: number;
  restartFunction: () => void;
}

export default function GameOverScreen(props: GameOverScreenProps) {
  const { score, level, highScore, pokemon, restartFunction } = props;

  return (
    <div className=" relative flex flex-col items-center">
      <div className="bg-slate-900 fixed -z-50 top-0 bottom-0 left-0 right-0" />
      <header className="text-yellow-500 font-bold text-6xl p-[1rem] mb-[1.5rem]">
        Game Over
      </header>
      <div className="flex w-[70%] justify-around items-center pt-[3rem] text-3xl text-cyan-500">
        <div className="flex ">
          <h1 className="mr-[0.5rem] text-yellow-500 font-black ">Level:</h1>
          {level}
        </div>
        <div className="flex">
          <h1 className="mr-[0.5rem] text-yellow-500 font-black">
            High Score:
          </h1>
          {highScore}
        </div>
        <div className="flex">
          <h1 className="mr-[0.5rem] text-yellow-500 font-black">Score:</h1>
          {score}
        </div>
      </div>
      <ul className="w-[60%] mt-[2rem] text-white font-medium p-[1rem] box-border flex flex-wrap justify-center">
        {pokemon.map((element) => {
          if (element.lastPokemon) {
            return (
              <li
                className="flex flex-col items-center bg-[#CC0000] mx-[0.5rem] box-border shadows w-[10rem] h-[15rem] text-xl font-medium rounded-3xl border-[5px] border-black"
                key={uuid()}
              >
                <img src={element.link} alt="" />
                <h1 className=" text-2xl">{element.name}</h1>
              </li>
            );
          }
          if (element.isClicked) {
            return (
              <li
                className="bg-[#3B4CCA] flex flex-col items-center mx-[0.5rem] shadows box-border w-[10rem] h-[15rem] text-xl font-medium rounded-3xl border-[5px] border-black"
                key={uuid()}
              >
                <img src={element.link} alt="" />
                <h1 className=" text-2xl">{element.name}</h1>
              </li>
            );
          } else {
            return (
              <li
                className="bg-[#B3A125] flex flex-col items-center shadows mx-[0.5rem] box-border w-[10rem] h-[15rem] text-xl font-medium rounded-3xl border-[5px] border-black"
                key={uuid()}
              >
                <img src={element.link} alt="" />
                <h1 className=" text-2xl">{element.name}</h1>
              </li>
            );
          }
        })}
      </ul>

      <div className="flex flex-col fixed left-[2%] top-[40%]">
        <div className="flex items-center my-[1rem]">
          <span className="w-[2.5rem] spanShadow h-[2.5rem] bg-[#3B4CCA] rounded-full mr-[0.5rem]" />
          <div className="text-white text-2xl font-medium">Clicked Pokemon</div>
        </div>
        <div className="flex items-center my-[1rem]">
          <span className="w-[2.5rem] spanShadow h-[2.5rem] bg-[#B3A125] rounded-full mr-[0.5rem]" />
          <div className="text-white text-2xl font-medium">
            Unclicked Pokemon
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-[2.5rem] spanShadow h-[2.5rem] bg-[#CC0000] rounded-full mr-[0.5rem]" />
          <div className="text-white text-2xl font-medium">
            Double Clicked <br /> Pokemon
          </div>
        </div>
      </div>

      <div>
        <button
          className="fixed bottom-[3rem] hover:bg-yellow-600 left-[50%] ml-[-5rem] text-white z-50 bg-cyan-600 rounded-md w-[10rem] text-2xl p-[0.8rem]"
          onClick={restartFunction}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}
