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
import './PokeBall.css'; // Import the CSS file

export default function PokeBall() {
  return (
    <div className="center-on-page">
      <div className="pokeball">
        <div className="pokeball__red-top"></div> {/* Add the red top element */}
        <div className="pokeball__button"></div>
      </div>
    </div>
  );
}
