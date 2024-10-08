import { useState, useEffect } from 'react';
import styles from '../styles/SecondGame.module.css'; // CSS dosyasını burada import ettik


const departments = [
  { name: 'Fizik', image: '../images/fizik.jpg' },
  { name: 'Fotonik', image: '../images/fotonik.jpg' },
  { name: 'Kimya', image: '../images/kimya.jpg' },
  { name: 'Matematik', image: '../images/matematik.jpg' },
  { name: 'Moleküler Biyoloji', image: '../images/molekuler-biyoloji.jpg' },
  { name: 'Bilgisayar', image: '../images/bilgisayar.jpg' },
  { name: 'Biyomühendislik', image: '../images/biyomuhendislik.jpg' },
  { name: 'Elektrik Mühendisliği', image: '../images/elektrik-muhendisligi.jpg' },
  
  { name: 'Gıda Mühendisliği', image: '/images/gida-muhendisligi.jpg' },
  { name: 'İnşaat Mühendisliği', image: '/images/insaat-muhendisligi.jpg' },
  { name: 'Kimya Mühendisliği', image: '/images/kimya-muhendisligi.jpg' },
  { name: 'Makine Mühendisliği', image: '/images/makine-muhendisligi.jpg' },
  { name: 'Malzeme Bilimi', image: '/images/malzeme-bilimi.jpg' },
  { name: 'Endüstriyel Tasarım', image: '/images/endustriyel-tasarim.jpg' },
  { name: 'Mimarlık', image: '/images/mimarlik.jpg' },
];

export default function SecondGame() {
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [zoom, setZoom] = useState(2); // Başlangıç zoom seviyesi
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // Zamanlayıcı için durum

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setMessage(`Oyun bitti! Doğru cevap: ${currentDepartment.name}`);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, gameOver, currentDepartment]);

  const startNewGame = () => {
    const randomDept = departments[Math.floor(Math.random() * departments.length)];
    setCurrentDepartment(randomDept);
    setZoom(2);
    setGuess('');
    setMessage('');
    setGameOver(false);
    setTimeRemaining(30); // Zamanlayıcıyı sıfırla
  };

  const handleGuess = () => {
    if (gameOver) return;

    if (guess.trim().toLowerCase() === currentDepartment.name.toLowerCase()) {
      setMessage('Tebrikler! Doğru tahmin.');
      setGameOver(true);
    } else {
      if (zoom > 1) {
        setZoom(zoom - 0.2); // Yanlış tahminlerde zoom seviyesini azalt
        setMessage('Yanlış tahmin, tekrar deneyin.');
      } else {
        setMessage(`Oyun bitti! Doğru cevap: ${currentDepartment.name}`);
        setGameOver(true);
      }
    }
    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  if (!currentDepartment) {
    return <div className={styles.container}><p>Yükleniyor...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Görsel Tahmin Oyunu</h1>
      <div 
        className={styles.imageContainer}
        style={{ 
          transform: `scale(${zoom})`,
          transition: 'transform 0.5s',
          overflow: 'hidden',
        }}
      >
        <img 
          src={currentDepartment.image} 
          alt="Tahmin Edilecek Bölüm" 
          className={styles.gameImage}
        />
      </div>
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          value={guess} 
          onChange={(e) => setGuess(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Tahmininizi girin" 
          disabled={gameOver}
          className={styles.inputBox}
        />
        <button onClick={handleGuess} disabled={gameOver} className={styles.guessButton}>
          Tahmin Et
        </button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
      {gameOver && (
        <button onClick={startNewGame} className={styles.restartButton}>
          Yeniden Başlat
        </button>
      )}
      <p>Kalan Süre: {timeRemaining} saniye</p>
    </div>
  );
}
