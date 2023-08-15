// import './PokeBall.css'

// export default function PokeBall(){


//     return (
// <div class="center-on-page">
  
//   <div class="pokeball">
//     <div class="pokeball__button"></div>
//   </div>
  
// </div>
//     )
// }



import React from 'react';
import './PokeBall.css';

export default function PokeBall({ onClick }) { // Accept onClick as a prop
  return (
    <div className="center-on-page">
      <div className="pokeball" onClick={onClick}> {/* Attach the onClick prop here */}
        <div className="pokeball__red-top"></div>
        <div className="pokeball__button"></div>
      </div>
      <h1>Hello</h1>
    </div>
  );
}
