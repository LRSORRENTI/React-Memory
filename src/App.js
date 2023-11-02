import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import PokeBall from './components/PokeBall';

const cardImages = [
  { "src": "/images/arcanine_.jpg", matched: false },
  { "src": "/images/dragonite_.jpg", matched: false },
  { "src": "/images/gengar_.jpg", matched: false },
  { "src": "/images/gyarados_.jpg", matched: false },
  { "src": "/images/pidgeot_.jpg", matched: false },
  { "src": "/images/venusaur_.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameWon(false);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }

    if (gameWon) {
      return;
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    const allCardsMatched = cards.every(card => card.matched);
    if (allCardsMatched) {
      setGameWon(true);
    }
  }, [choiceOne, choiceTwo, cards]
  
  );

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <PokeBall onClick={shuffleCards}/>
      <h3 id="pokematch">Poké Match</h3>
      <p className='press'>{gameWon ? "Winner Winner Chicken Dinner!" : "Press PokéBall To Reset"} | Turn {turns}</p>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
        <h1 id='hello'>hello</h1>
      </div>
    </div>
  );
};

export default App;
