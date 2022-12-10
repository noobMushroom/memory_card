import { useEffect, useRef, useState } from 'react';
import Board from './components/Board';
import { shuffleArray, getLink, randomNumber } from './components/images';
import LoadingScreen from './components/LoadingScree';
import GameOverScreen from './components/GameOverScreen';
import pokeBall from './assets/5.svg';

export interface Image {
  id: number;
  link: string;
  name: string;
  isClicked: boolean;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  lastPokemon: boolean;
}

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Image[]>([]);
  const [isRestart, setRestart] = useState(false);

  const prevImages = useRef([...pokemonData]);

  function handleLoadingScreen() {
    setIsloading(false);
  }

  // initally setting state for each render
  function startGame() {
    setIsloading(true);
    setRestart(false);
    setIsGameOver(false);
  }

  // handleLoading changes the value of loading state
  useEffect(() => {
    startGame();
    const pokemonNumbers = randomNumber(level);
    const fetchPokemonData = async () => {
      try {
        const data = await Promise.all(
          pokemonNumbers.map((num) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) =>
              res.json()
            )
          )
        );
        const formattedData = data.map(
          ({ name, id, height, weight, order, base_experience }) => ({
            height,
            weight,
            order,
            base_experience,
            name,
            id,
            link: getLink(id),
            isClicked: false,
            lastPokemon: false,
          })
        );
        setPokemonData(formattedData);
      } catch (e) {
        console.error(e);
      }
    };

    prevImages.current = pokemonData;
    fetchPokemonData();
  }, [level, isRestart]);

  const handleClick = (pokemon: Image) => {
    if (pokemon.isClicked === false) {
      pokemon.isClicked = true;
      setPokemonData(shuffleArray(pokemonData));
      setScore((prev) => prev + level);
      setRound((prev) => prev + 1);
      if (round === pokemonData.length) {
        setRound(1);
        setLevel((prev) => prev + 1);
      }
    } else {
      hanldeGameOver(pokemon);
    }
  };

  // the last pokemon user clicked as the arguement
  function hanldeGameOver(pokemon: Image) {
    pokemon.lastPokemon = true;
    if (highScore < score) setHighScore(score);
    setIsGameOver(true);
  }

  function restart() {
    setRound(1);
    setScore(0);
    setIsloading(true);
    setLevel(1);
    setRestart(true);
  }

  if (isLoading)
    return (
      <LoadingScreen
        score={score}
        level={level}
        images={prevImages.current}
        handleLoading={handleLoadingScreen}
      />
    );

  if (isGameOver) {
    return (
      <GameOverScreen
        pokemon={pokemonData}
        highScore={highScore}
        level={level}
        restartFunction={restart}
        score={score}
      />
    );
  }
  return (
    <div className="relative ">
      <div className="flex sticky top-0 left-0 h-[10rem] w-full bg-[#3B4CCA] justify-between px-[2rem] py-[0.5rem] border-[10px] border-black">
        <div>
          <div className="digitalFont text-5xl mb-[0.5rem]">score: {score}</div>
          <div className="digitalFont text-3xl">high score: {highScore}</div>
        </div>
        <div className="digitalFont text-6xl absolute left-[50%] ml-[-5.4rem]">
          round: {round}
        </div>
        <div className="digitalFont text-6xl ">level: {level}</div>
        <img
          className="w-[8rem] absolute top-[5.3rem] ml-[-4rem] left-[50%] "
          src={pokeBall}
          alt=""
        />
      </div>
      <div>
        <Board state={pokemonData} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
