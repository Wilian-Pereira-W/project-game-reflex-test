import { useEffect, useState } from 'react';
import VictoryScreen from '../VictoryScreen';
import { useInterval } from '../../hooks/useInterval';
import { secondsToTime } from '../../utils/formatTime';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function Game() {
  const [array] = useState(new Array(16).fill('reflex'));
  const [arrayOption] = useState(new Array(16).fill('reflex'));
  const [id, setId] = useState<number>(0);
  const [option, setOption] = useState<number[]>([]);
  const [mainTime, setMainTime] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [viewVictory, setViewVictory] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [btnOneCor, setBtnOneCor] = useState('');
  const [btnTwoCor, setBtnTwoCor] = useState('');
  const navigate = useNavigate();

  useInterval(
    () => {
      setMainTime(mainTime + 1);
    },
    isPlaying ? 10 : null,
  );

  useEffect(() => {
    const coresStorage: string | null = localStorage.getItem('cores');
    if (coresStorage) {
      const cores = JSON.parse(coresStorage);
      setBackgroundColor(cores.backgroundColor);
      setBtnOneCor(cores.btnOneCor);
      setBtnTwoCor(cores.btnTwoCor);
    }
  }, []);

  useEffect(() => {
    const array: number[] = [];

    arrayOption.forEach((_x, index) => {
      array.push(index);
    });
    setOption(array);
  }, [arrayOption]);

  useEffect(() => {
    const btn = document.getElementById(String(id));
    if (btn) {
      btn.className = styles.newCor;
    }
  }, [id]);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    const btn = document.querySelectorAll('button');
    btn.forEach((element) => {
      if (element.className.includes('newCor')) {
        element.style.backgroundColor = btnOneCor;
      } else {
        element.style.backgroundColor = btnTwoCor;
      }
    });
  }, [backgroundColor, btnOneCor, btnTwoCor, id]);

  const bestTime = (currentTime: number, oldTime: number) => {
    let data = {
      melhorTempo: 0,
      tempoAtual: 0,
    };
    if (currentTime < oldTime) {
      data = {
        melhorTempo: currentTime,
        tempoAtual: currentTime,
      };
      localStorage.setItem('time', JSON.stringify(data));
    } else {
      data = {
        melhorTempo: oldTime,
        tempoAtual: currentTime,
      };
      localStorage.setItem('time', JSON.stringify(data));
    }
  };

  const validateVictory = (arr: number[]) => {
    if (arr.length === 1) {
      setPlaying(false);
      setViewVictory(false);
      const timer: string | null = localStorage.getItem('time');
      let data = {
        melhorTempo: 0,
        tempoAtual: 0,
      };
      if (timer) {
        const times = JSON.parse(timer);
        bestTime(mainTime, times.melhorTempo);
      } else {
        data = {
          melhorTempo: mainTime,
          tempoAtual: mainTime,
        };
        localStorage.setItem('time', JSON.stringify(data));
      }
      const dataCor = {
        backgroundColor,
        btnOneCor,
        btnTwoCor,
      };
      localStorage.setItem('cores', JSON.stringify(dataCor));
    }
  };
  const handleClick = (index: string) => {
    if (Number(index) === id) {
      setPlaying(true);
      validateVictory(option);
      const btn = document.getElementById(index);
      if (btn) {
        btn.className = styles.opacity;
      }
      document.getElementById(index)?.setAttribute('disabled', 'disabled');
      const newOption = option.filter((n) => n !== Number(index));
      setOption(newOption);
      const numero = Math.floor(Math.random() * newOption.length);
      setId(newOption[numero]);
    } else {
      const dataCor = {
        backgroundColor,
        btnOneCor,
        btnTwoCor,
      };
      localStorage.setItem('cores', JSON.stringify(dataCor));
      navigate(0);
    }
  };
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.contain}>
        {viewVictory && (
          <section className={styles.containOptionCor}>
            <label htmlFor="backgroundColor">
              Cor do fundo
              <input
                type="color"
                value={backgroundColor}
                onChange={({ target }) => setBackgroundColor(target.value)}
                name="backgroundColor"
                id="backgroundColor"
              />
            </label>
            <label htmlFor="backgroundColor">
              Cor do botão 1
              <input
                type="color"
                value={btnOneCor}
                onChange={({ target }) => setBtnOneCor(target.value)}
                name="backgroundColor"
                id="backgroundColor"
              />
            </label>
            <label htmlFor="backgroundColor">
              Cor do botão 2
              <input
                type="color"
                value={btnTwoCor}
                onChange={({ target }) => setBtnTwoCor(target.value)}
                name="backgroundColor"
                id="backgroundColor"
              />
            </label>
          </section>
        )}
        <section className={styles.containTime}>
          {viewVictory && <h2>{secondsToTime(mainTime)}</h2>}
        </section>
        <section className={styles.containGame}>
          {viewVictory ? (
            array.map((_arr, index) => (
              <button
                type="button"
                key={String(index)}
                id={String(index)}
                onClick={() => handleClick(String(index))}
              ></button>
            ))
          ) : (
            <VictoryScreen />
          )}
        </section>
      </main>
    </div>
  );
}

export default Game;
