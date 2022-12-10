import { Image } from '../App';
export const getLink = (num: number): string => {
  const formattedId = `${num}`.padStart(3, '0');
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`;
};

export const randomNumber = (num: number): number[] => {
  let lastNumber = num * 2 + 2;
  let array: number[] = [];
  let randNumber = Math.floor(Math.random() * 600);
  if (randNumber === 0) randNumber += 1;
  for (let i = randNumber; i < randNumber + lastNumber; i++) {
    array.push(i);
  }
  return array;
};

export function shuffleArray(array: Image[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
