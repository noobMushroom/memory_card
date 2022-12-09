import { useEffect, useState } from 'react';
import Board from './components/Board';
import { shuffleArray, getLink, randomNumber } from './components/images';
import LoadingScreen from './components/LoadingScree';

export interface Image {
  id: number;
  link: string;
  name: string;
  isClicked: boolean;
  abilities: string[];
  base_experience: number;
  height: number;
  order: number;
  weight: number;
}

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Image[]>([]);

  function handleLoadingScreen() {
    setIsloading(false);
  }

  // handleLoading changes the value of loading state
  useEffect(() => {
    setIsGameOver(false);
    setIsloading(true); // initally setting is loading to true
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
          ({
            name,
            id,
            height,
            weight,
            order,
            base_experience,
            abilities,
          }) => ({
            abilities,
            height,
            weight,
            order,
            base_experience,
            name,
            id,
            link: getLink(id),
            isClicked: false,
          })
        );
        setPokemonData(formattedData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPokemonData();
  }, [level, isGameOver]);

  const handleClick = (pokemon: Image) => {
    if (pokemon.isClicked === false) {
      pokemon.isClicked = true;
      setPokemonData(shuffleArray(pokemonData));
      setScore((prev) => prev + level);
      setRound(round + 1);
      if (round === pokemonData.length) {
        setRound(1);
        setLevel((prev) => prev + 1);
      }
    } else {
      setLevel(1);
      setRound(1);
      setScore(0);
      if (highScore < score) setHighScore(score);
      setIsGameOver(true);
    }
  };

  if (isLoading)
    return (
      <LoadingScreen
        level={level}
        images={pokemonData}
        handleLoading={handleLoadingScreen}
      />
    );
  return (
    <div>
      <div>level {level}</div>
      <div> round {round}</div>
      <div>score {score}</div>
      <div>high score{highScore}</div>
      <br />
      <Board state={pokemonData} handleClick={handleClick} />
    </div>
  );
}

export default App;
