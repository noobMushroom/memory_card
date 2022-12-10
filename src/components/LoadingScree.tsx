import { Image } from '../App';
import uuid from 'react-uuid';
import ProgressBar from './ProgresBar';
import { useRef } from 'react';

interface LoadingScreenProps {
  level: number;
  images: Image[];
  score: number;
  handleLoading: () => void;
}

function randomPokemon(pics: Image[]) {
  let tempArray = [...pics];
  let randomArray: Image[] = [];
  for (let i = 0; i < 3; i++) {
    let randomNumber = Math.floor(Math.random() * tempArray.length);
    let temp = tempArray[randomNumber];
    randomArray.push(temp);
    tempArray.splice(randomNumber, 1);
  }
  return randomArray;
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const { score, level, images, handleLoading } = props;
  let random = randomPokemon(images);
  const randomPokemonArray = useRef(random);
  if (level === 1)
    return (
      <div className="flex w-full h-[100vh] bg-slate-900 items-center justify-center">
        <p className="text-white font-black text-5xl">Setting Board...</p>
        <ProgressBar level={level} handleLoading={handleLoading} />
      </div>
    );
  return (
    <div className="flex w-full h-[100vh] bg-slate-900 items-center flex-col justify-center">
      <div className="flex w-[40%] mb-[2rem] justify-around items-center pt-[2rem] text-3xl text-cyan-500">
        <div className="flex">
          <h1 className="mr-[0.5rem] text-yellow-500 font-black">Score: </h1>
          {score}
        </div>
        <div className="flex">
          <h1 className="mr-[0.5rem] text-yellow-500 font-black">Level:</h1>
          {level}
        </div>
      </div>

      <div className="flex justify-center mb-[8rem] items-center w-full p-[1rem]">
        {randomPokemonArray.current.map((pokemon) => {
          return (
            <div
              key={uuid()}
              className="flex w-full mb-[8rem] items-center text-white"
            >
              <div>
                <img className="h-[18rem]" src={pokemon.link} alt="" />
              </div>
              <div>
                <div className="flex items-center text-2xl text-yellow-300">
                  <h1 className="text-red-600 mr-[0.8rem] text-2xl font-semibold">
                    Name:
                  </h1>
                  {pokemon.name}
                </div>
                <div className="flex items-center text-xl text-yellow-300">
                  <h1 className="text-red-600 mr-[0.8rem] text-xl font-semibold">
                    Height:
                  </h1>
                  {pokemon.height}
                </div>
                <div className="flex items-center text-xl text-yellow-300">
                  <h1 className="text-red-600 mr-[0.8rem] text-xl font-semibold">
                    Weight:
                  </h1>
                  {pokemon.weight}
                </div>
                <div className="flex items-center text-xl text-yellow-300">
                  <h1 className="text-red-600 mr-[0.8rem] text-xl font-semibold">
                    Order:
                  </h1>
                  {pokemon.order}
                </div>
                <div className="flex items-center text-xl text-yellow-300">
                  <h1 className="text-red-600 mr-[0.8rem] text-xl font-semibold">
                    Base Experience:
                  </h1>
                  {pokemon.base_experience}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ProgressBar level={level} handleLoading={handleLoading} />
    </div>
  );
}
