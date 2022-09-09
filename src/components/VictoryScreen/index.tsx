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
      <h2 className={styles.results}>
        {time !== null && time.tempoAtual <= time.melhorTempo
          ? 'Parabéns!!!!'
          : `Tempo: + ${
              time !== null && secondsToTime(time.tempoAtual - time.melhorTempo)
            }`}
      </h2>
      <h2 className={styles.results}>{`Melhor tempo: ${
        time !== null && secondsToTime(time.melhorTempo)
      }`}</h2>
      <h2 className={styles.results}>{`Tempo atual: ${
        time !== null && secondsToTime(time.tempoAtual)
      }`}</h2>
      <input
        type="submit"
        value="Jogar Novamente"
        className={styles.jogar}
        onClick={() => navigate(0)}
      />
    </div>
  );
}

export default VictoryScreen;
