
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
    const shuffledCards = [...cardImages]
  }


  return (
    <div className='App'>
     <h1>Memory Match</h1>
     <button>New Game</button>
    </div>
  );
}

export default App;
