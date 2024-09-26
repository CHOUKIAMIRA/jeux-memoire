import { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Chrono from './components/Chrono';
import { HiOutlineRefresh } from "react-icons/hi";
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
    setIsGameFinished(false); // Réinitialise la fin du jeu
    setScore(0); // Réinitialise le score
    setTime(0); // Réinitialise le temps
  };

  // Fonction pour terminer le jeu lorsque toutes les paires sont trouvées
  const finishGame = () => {
    setIsRunning(false); // Arrête le chrono
    setIsGameFinished(true); // Indique que le jeu est terminé
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
          <h1 style={{color:"blue"}}>Félicitations, vous avez terminé !</h1>
          <p>Temps écoulé : {time} secondes</p>
          <p>Score : 10</p>
          <button onClick={startGame} ><HiOutlineRefresh /></button>
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
