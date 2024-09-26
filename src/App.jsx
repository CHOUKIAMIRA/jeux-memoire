import { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Chrono from './components/Chrono';

function App() {
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Démarre ou arrête le chronomètre
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Fonction pour augmenter le score
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  // Fonction pour démarrer le jeu
  const startGame = () => {
    setStart(true);
    setIsRunning(true); // Démarre le chrono
  };

  return (
    <div className="app">
      {!start ? (
        <button
          style={{
            width: '200px',
            height: '150px',
            borderRadius: '20px',
            fontSize: '40px',
            cursor: 'pointer',
          }}
          onClick={startGame}
        >
          Start
        </button>
      ) : (
        <div>
          <div>
            <Chrono time={time} /> {/* Affiche le chrono */}
          </div>
          <br />
          <div>
            Score: {score} {/* Affiche le score */}
          </div>
          <div>
            <Cards updateScore={increaseScore} /> {/* Passe la fonction de mise à jour du score */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
