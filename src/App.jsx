import { useState, useEffect } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi'; // Assure-toi que react-icons est installé
import Cards from './components/Cards';
import Chrono from './components/Chrono';

function App() {
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

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
    setTime(0);  // Réinitialise le temps
    setIsGameFinished(false); // Réinitialise l'état du jeu terminé
    // Le score n'est pas réinitialisé ici pour continuer à partir du score précédent
  };

  // Fonction pour terminer le jeu
  const finishGame = () => {
    setIsRunning(false); // Arrête le chrono
    setIsGameFinished(true); // Marque le jeu comme terminé
  };

  return (
    <div className="app">
      {!start ? (
        <button
          style={{
            width: '100px',
            height: '75px',
            borderRadius: '10px',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={startGame}
        >
          Start
        </button>
      ) : isGameFinished ? (
        <div className="congratulations">
          <h1 style={{ color: 'blue' }}>Félicitations, vous avez terminé !</h1>
          <p>Temps écoulé : {time} secondes</p>
          <p>Score cumulé : {score}</p>
          <button onClick={startGame}>
            <HiOutlineRefresh /> Rejouer
          </button>
        </div>
      ) : (
        <div>
          <div>
            <Chrono time={time} score={score} />
          </div>
          <br />
          <div>
            <Cards updateScore={increaseScore} finishGame={finishGame} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
