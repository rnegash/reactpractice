import { useState } from "react";
import "./App.css";

const MemoryGame = ({ images }: { images: string[] }) => {
  const game = [...images, ...images];
  const [currentSelected, setCurrentSelected] = useState<number | null>();
  const [solved, setSolved] = useState<string[]>([]);
  const [currentGuesses, setCurrentGuesses] = useState<
    [[number, string], [number, string]?] | null
  >();

  if (Array.isArray(currentGuesses) && currentGuesses.length === 2) {
    if (currentGuesses[1] && currentGuesses[0][1] === currentGuesses[1][1]) {
      setSolved((solved) => [...solved, currentGuesses[0][1]]);
      console.log(solved);
      setCurrentGuesses(null);
    } else {
      setCurrentGuesses(null);
    }
  }

  const cardState = (image: string, idx: number) => {
    const isSolved = solved.findIndex((solved) => solved === image) !== -1;

    if (!currentGuesses) return "brightness(0.3)";

    const isSelected =
      currentGuesses?.findIndex((guess) => guess && guess[0] === idx) > -1;

    if (isSolved) return "grayscale(100%)";

    if (isSelected) return "initial";

    return "brightness(0.3)";
  };

  return (
    <div className="game">
      {game.map((image, idx) => (
        <img
          key={idx}
          src={image}
          style={{
            filter: cardState(image, idx),
          }}
          onClick={() => {
            if (
              currentSelected === idx ||
              solved.findIndex((solved) => solved === image) !== -1
            ) {
              return;
            }
            setCurrentSelected(idx);
            setCurrentGuesses((currentGuesses) => {
              return currentGuesses
                ? [currentGuesses[0], [idx, image]]
                : [[idx, image]];
            });
          }}
        ></img>
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <MemoryGame
          images={[
            "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
            "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
            "https://images.unsplash.com/photo-1520763185298-1b434c919102",
            "https://images.unsplash.com/photo-1442458017215-285b83f65851",
            "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
            "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
          ]}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
