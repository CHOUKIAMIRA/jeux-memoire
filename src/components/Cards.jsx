import { useState } from 'react';
import Card from './Card';

function Cards({ updateScore, finishGame }) {
  const [items, setItems] = useState([
    { id: 1, img: '/jeux-memoire/img/1.png', stat: '' },
    { id: 1, img: '/jeux-memoire/img/1.png', stat: '' },
    { id: 2, img: '/jeux-memoire/img/3.png', stat: '' },
    { id: 2, img: '/jeux-memoire/img/3.png', stat: '' },
    { id: 3, img: '/jeux-memoire/img/4.png', stat: '' },
    { id: 3, img: '/jeux-memoire/img/4.png', stat: '' },
    { id: 4, img: '/jeux-memoire/img/5.png', stat: '' },
    { id: 4, img: '/jeux-memoire/img/5.png', stat: '' },
    { id: 5, img: '/jeux-memoire/img/6.png', stat: '' },
    { id: 5, img: '/jeux-memoire/img/6.png', stat: '' },
    { id: 6, img: '/jeux-memoire/img/8.png', stat: '' },
    { id: 6, img: '/jeux-memoire/img/8.png', stat: '' },
    { id: 7, img: '/jeux-memoire/img/9.png', stat: '' },
    { id: 7, img: '/jeux-memoire/img/9.png', stat: '' },
    { id: 8, img: '/jeux-memoire/img/10.png', stat: '' },
    { id: 8, img: '/jeux-memoire/img/10.png', stat: '' },
  ].sort(() => Math.random() - 0.5));

  const [prev, setPrev] = useState(-1);
  const [pairsFound, setPairsFound] = useState(0); // Pour suivre les paires trouvées

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = 'correct';
      items[prev].stat = 'correct';
      setItems([...items]);
      setPrev(-1);
      setPairsFound(pairsFound + 1); // Augmente le nombre de paires trouvées
      updateScore(); // Augmente le score à chaque paire correcte
      if (pairsFound + 1 === items.length / 2) {
        finishGame(); // Termine le jeu lorsque toutes les paires sont trouvées
      }
    } else {
      items[current].stat = 'wrong';
      items[prev].stat = 'wrong';
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = '';
        items[prev].stat = '';
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = 'active';
      setItems([...items]);
      setPrev(id);
    } else if (id !== prev && items[id].stat !== 'correct') {
      check(id);
    }
  }

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card key={index} item={item} id={index} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Cards;
