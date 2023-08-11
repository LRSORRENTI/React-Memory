
import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
const cardImages = [
  { "src": "/images/arcanine_.jpg" },
  { "src": "/images/dragonite_.jpg" },
  { "src": "/images/gengar_.jpg" },
  { "src": "/images/gyarados_.jpg" },
  { "src": "/images/pidgeot_.jpg" },
  { "src": "/images/venusaur_.jpg" },
];


function App() {
  // we also need some state, we have cards, 
  // and setCards which we'll set to useState 
  const [cards, setCards] = useState([])

  const [turns, setTurns] = useState(0)


  // shuffle the cards 
  const shuffleCards = () => {

    // inside the shuffle cards function, we add 
    // a new array shuffled, and we spread using ... 
    // the cardImages, which essentially gives us 
    // the same as what we see in cardImages 

    const shuffledCards = [...cardImages, ...cardImages]
    
    // But we spread them twice, so we've got two sets of 
    // cardImages in the above array, 12 total
    
    // Next we tack on the sort method, which is connected 
    // to shuffleCards 

    // and inside sort will fire for each item, and we want 
    // math.random, so if the number is less than zero
    // the order is unmutated 

    // if num > 0, then the pairing of numbers we want 
    // to swap 
      .sort(() => {   
        return  Math.random() - 0.5;
      })

      // next we chain on the map method, which will 
      // fire a function on each item in the new sorted 
      // array, for each, we'll add an id 

      .map((card) => (

        // in here we'll return an object which 
        // returns a spread version of that card, 
        // but also we tack on an id, which we generate 
        // with Math.random 

        { ...card, id: Math.random()}

      ))
      setCards(shuffledCards)
      // whenever this is called, it will update the cards 
      // state to be shuffledCards

      setTurns(0)
      // the above is important, because everytime we 
      // press      <button>New Game</button>
      // we want the turns to go back to 0, everytime 
      // we have a new game, turns should start at 0
  };

console.log("Cards: ", cards, "Turns: ", turns )


  return (
    <div className='App'>
     <h1>Memory Match</h1>
     <button onClick={shuffleCards}>New Game</button>
    
    <div className='card-grid'>
      {cards.map(card => (
      <SingleCard key={card.id} card={card}/>
      ))}
    </div>
    </div>
  );
};

export default App;
