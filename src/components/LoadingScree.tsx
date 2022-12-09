import { Image } from '../App';
import uuid from 'react-uuid';
import ProgressBar from './ProgresBar';
import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  level: number;
  images: Image[];
  handleLoading: () => void;
}

function randomPokemon(pics: Image[]) {
  let tempArray = [...pics];
  let randomArray: Image[] = [];
  for (let i = 0; i < 3; i++) {
    let randomNumber = Math.floor(Math.random() * tempArray.length);
    let temp = tempArray[randomNumber];
    randomArray.push(temp);
    tempArray.slice(randomNumber, 0);
  }

  return randomArray;
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const { level, images, handleLoading } = props;
  let randomPokemonArray = randomPokemon(images);
  if (level === 1)
    return (
      <div>
        <ProgressBar level={level} handleLoading={handleLoading} />
      </div>
    );
  return (
    <div>
      <div>
        {randomPokemonArray.map((pokemon) => {
          return (
            <div key={uuid()}>
              <div>{pokemon.name}</div>
              <div>{pokemon.height}</div>
              <div>{pokemon.weight}</div>
              <div>{pokemon.order}</div>
              <div>{pokemon.base_experience}</div>
            </div>
          );
        })}
      </div>
      <ProgressBar level={level} handleLoading={handleLoading} />
    </div>
  );
}
