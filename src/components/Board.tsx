import { Image } from '../App';

interface BoardProps {
  state: Image[];
  handleClick: (arg0: Image) => void;
}

export default function Board(props: BoardProps) {
  const { state, handleClick } = props;
  return (
    <div className=" flex justify-center  pt-[5rem] ">
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-yellow-500 -z-50 border-b-0 border-[10px] border-black" />
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-50 bg-black/10" />
      <div className="w-[70%]  p-[1rem] box-border flex flex-wrap justify-center">
        {state.map((element) => {
          return (
            <button
              className="bg-cyan-500/90 box-border w-[10rem] h-[15rem] text-xl pokemonButton  m-[0.5rem] font-medium rounded-3xl border-[5px] border-black"
              key={element.id}
              onClick={() => handleClick(element)}
            >
              <img src={element.link} alt="" />
              {element.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
