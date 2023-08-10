
import './App.css';

const cardImages = [
  { "src": "/images/angular.png" },
  { "src": "/images/django.png" },
  { "src": "/images/laravel.png" },
  { "src": "/images/react.png" },
  { "src": "/images/rubyonrails.png" },
  { "src": "/images/vue.png" },
];


function App() {

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
          Math.random() - 0.5;
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
        
      ));
  }


  return (
    <div className='App'>
     <h1>Memory Match</h1>
     <button>New Game</button>
    </div>
  );
}

export default App;
