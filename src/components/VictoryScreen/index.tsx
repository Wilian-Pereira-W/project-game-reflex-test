import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { secondsToTime } from '../../utils/formatTime';
import styles from './styles.module.scss';

function VictoryScreen() {
  const [time, setTime] = useState<{
    melhorTempo: number;
    tempoAtual: number;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer: string | null = localStorage.getItem('time');
    if (timer) {
      const times = JSON.parse(timer);
      setTime(times);
    }
  }, []);
  return (
    <div className={styles.container}>
      <h2>
        {time !== null && time.tempoAtual <= time.melhorTempo
          ? 'Parabéns!!!!'
          : `Tempo: + ${
              time !== null && secondsToTime(time.tempoAtual - time.melhorTempo)
            }`}
      </h2>
      <p className={styles.results}>{`Melhor tempo: ${
        time !== null && secondsToTime(time.melhorTempo)
      }`}</p>
      <p className={styles.results}>{`Tempo atual: ${
        time !== null && secondsToTime(time.tempoAtual)
      }`}</p>
      <button
        type="button"
        className={styles.jogar}
        onClick={() => navigate(0)}
      >
        Jogar Novamente
      </button>
    </div>
  );
}

export default VictoryScreen;
