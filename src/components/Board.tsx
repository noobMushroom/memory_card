import { Image } from '../App';

interface BoardProps {
  state: Image[];
  handleClick: (arg0: Image) => void;
}

export default function Board(props: BoardProps) {
  const { state, handleClick } = props;
  return (
    <div>
      {state.map((element) => {
        return (
          <button key={element.id} onClick={() => handleClick(element)}>
            <img src={element.link} alt="" />
          </button>
        );
      })}
    </div>
  );
}
