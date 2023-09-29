import React from 'react';
import { newbies } from './newbie';
import './styles.scss';

const App = () => {
    return (
        <ul className>
      {newbies.map(el => {
        <User userdata={el} key={el.name} />
       })}
       </ul>
    );
    
}

export default App;
