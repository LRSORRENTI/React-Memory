
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import PokeBall from './components/PokeBall'

// below we have all the cards intially set with 
// the matched value to false 
const cardImages = [
  { "src": "/images/arcanine_.jpg", matched: false},
  { "src": "/images/dragonite_.jpg", matched: false},
  { "src": "/images/gengar_.jpg", matched: false },
  { "src": "/images/gyarados_.jpg", matched: false},
  { "src": "/images/pidgeot_.jpg", matched: false},
  { "src": "/images/venusaur_.jpg", matched: false},
];


function App() {
  // we also need some state, we have cards, 
  // and setCards which we'll set to useState 
  const [cards, setCards] = useState([])

  const [turns, setTurns] = useState(0)


  // We'll need more state to track choices the 
  // user makes: 

  const [choiceOne, setChoiceOne] = useState(null)
  //so when a user clicks a card, we'll updtae 
  // the above choiceOne to reflect that choice  

  const [choiceTwo, setChoiceTwo] = useState(null)
// Then when they click a second card we update 
// choiceTwo, to reflect that choice 

// Which means we need click events for each card 

// below we'll add state so that the user can't click 
// extremely quickly, 
const [disabled, setDisabled] = useState(false)

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
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      // whenever this is called, it will update the cards 
      // state to be shuffledCards

      setTurns(0)
      // the above is important, because everytime we 
      // press      <button>New Game</button>
      // we want the turns to go back to 0, everytime 
      // we have a new game, turns should start at 0
  };

// console.log("Cards: ", cards, "Turns: ", turns )

// Choice handler 

const handleChoice = (card) => {
    // console.log(card)

    // below if choiceOne is null, after the ternary check ? 
    // that means we don't uet have a selection for choiceOne

    // Which will in turn run the code on the right side 
    // of the colon: setChoicOne 

    // but if choiceOne before the ? is not null, it 
    // will return true, which means setChoiceTwo 
    // will run, left of the colon

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

// compare choices with useEffect hook, use effects, 
// takes a function, and an array 

// this will fire when a component mounts, then 
// fire again a dependency in the array argument changed 


useEffect(( ) => {
  // so if the ternary inside handleChoice fires 
  // setChoiceOne, the useEffect fires again, same 
  // if setChoiceTwo fires in the ternary

  // inside here we need to first check if we have 
  // values for choiceOne and choiceTwo

  if(choiceOne && choiceTwo){
    // we set the disabled state to true, once 
    // a choice is made 
    setDisabled(true)


    // this comparison will only be true if neither 
    // choiceOne and choiceTwo are null
    if(choiceOne.src === choiceTwo.src){
      // console.log(`That's a match!`)
      // if the above returns true, we have a match
      setCards(prevCards => {
        // when above is true we use setCards to 
        // update the state 

        // inside here we'll check the cards for the 
        // match, using map to iterate and return a new 
        // array of cards, map takes the old array, prevCards. 
        //and makes a new array 
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            // so the above will always turn two of the 
            // cards matched property to true if it's a match 
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
      // this is where we also want to update the 
      // matched property for a given card in the cards 
      // array above, intially they're all set to false 
    }
    else {
      // console.log(`Cards dont match`)
      setTimeout( () =>  resetTurn(), 1000)
      // the above setTimeout will ensure that 
      // the cards that don't match don't snap 
      // back to unflipped, it lets the cards 
      // show for 1 second, then change back
    }
  }


}, [choiceOne, choiceTwo])

console.log(cards)

// reset choices, and increase turn count 

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}


// Start new game immediately by calling this 
// useEffect hook right when the page loads 

useEffect(() => {
  shuffleCards()
}, [])

  return (
    
    <div className='App'>
      <PokeBall onClick={shuffleCards}/>
     <h3 id="pokematch">Poké Match</h3>
     {/* <p>Match Cards, Click Poké Ball To Reset</p> */}
     {/* <button className='btn' onClick={shuffleCards}>New Game</button> */}
    
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
    </div>
    {/* <p>Turns: {turns}</p> */}
    </div>
  );
};

export default App;
