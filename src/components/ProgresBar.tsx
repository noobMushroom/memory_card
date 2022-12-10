import { useEffect, useRef, useState } from 'react';
import pokeBall from '../assets/Pokeball.svg';
import circle from '../assets/icons8-red-circle-96.png';
interface ProgressInterface {
  level: number;
  handleLoading: () => void;
}

export default function ProgressBar(props: ProgressInterface) {
  const { level, handleLoading } = props;
  const [progress, setProgress] = useState(0);
  const time = useRef(5000);

  useEffect(() => {
    if (progress <= 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, time.current / 100 + 100);
      return () => clearTimeout(timer);
    }
    handleLoading();
    time.current = time.current + 3000;
  }, [progress, level]);

  return (
    <div className="flex flex-col items-center justify-center absolute bottom-[7rem] left-[50%] ml-[-25rem]">
      <img
        className="w-[10rem] rotateAnimation mb-[-2.5rem]"
        src={pokeBall}
        alt=""
      />
      <div className="relative w-[50rem] bg-[#ffde00] h-[1em] rounded-full">
        <img
          style={{
            left: `${progress}%`,
          }}
          src={circle}
          className="absolute w-[2rem]  transition-all left-0 ml-[-1rem] ease-in top-[-0.5rem]"
          alt=""
        />
        <div
          style={{
            width: `${progress}%`,
          }}
          className="progressColor transition-[width] rounded-full ease-in h-[100%]"
        ></div>
      </div>
    </div>
  );
}
