import { useEffect, useRef, useState } from 'react';
interface ProgressInterface {
  level: number;
  handleLoading: () => void;
}

export default function ProgressBar(props: ProgressInterface) {
  const { level, handleLoading } = props;
  const [progress, setProgress] = useState(0);
  const time = useRef(5000);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, time.current / 100);
      return () => clearTimeout(timer);
    }
    handleLoading();
    time.current = time.current + 3000;
  }, [progress, level]);

  return (
    <div>
      <div className="w-[30rem] bg-red-800 h-[1.5em]">
        <div
          style={{
            width: `${progress}%`,
          }}
          className="bg-cyan-900 transition-[width] ease-in h-[100%]"
        ></div>
      </div>
    </div>
  );
}
