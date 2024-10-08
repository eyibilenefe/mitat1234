// components/Game.js
import { useState } from 'react'
import styles from '../styles/Home.module.css'

// Departman verilerini burada saklıyoruz
const departments = [
  {
    departmanadi: 'Fizik',
    turkiyeDevletUniSiralamasi: null, // Veri yok
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2', // Yandal ve ÇAP sayısı
    yksYaklasikSiralamasi2024: 87000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 35
  },
  {
    departmanadi: 'Fotonik',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 2019,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 120000,
    erasmusUlkeSayisi: 3,
    ogretimGorevlisiSayisi: 9
  },
  {
    departmanadi: 'Kimya',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 8,
    ogretimGorevlisiSayisi: 17
  },
  {
    departmanadi: 'Matematik',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 35
  },
  {
    departmanadi: 'Moleküler Biyoloji',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 2002,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 36000,
    erasmusUlkeSayisi: 9,
    ogretimGorevlisiSayisi: 16
  },
  {
    departmanadi: 'Bilgisayar',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 8000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 16
  },
  {
    departmanadi: 'Biyomühendislik',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 2014,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 60000,
    erasmusUlkeSayisi: 2,
    ogretimGorevlisiSayisi: 12
  },
  {
    departmanadi: 'Çevre Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1997,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 140000,
    erasmusUlkeSayisi: 3,
    ogretimGorevlisiSayisi: 8
  },
  {
    departmanadi: 'Elektrik Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1994,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 20000,
    erasmusUlkeSayisi: 16,
    ogretimGorevlisiSayisi: 12
  },
  {
    departmanadi: 'Enerji Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 2014,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 60000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 6
  },
  {
    departmanadi: 'Gıda Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1996,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 13
  },
  {
    departmanadi: 'İnşaat Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 130000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 15
  },
  {
    departmanadi: 'Kimya Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1996,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 40000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 15
  },
  {
    departmanadi: 'Makine Mühendisliği',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1998,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 30000,
    erasmusUlkeSayisi: 12,
    ogretimGorevlisiSayisi: 18
  },
  {
    departmanadi: 'Malzeme Bilimi',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1998,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 70000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 11
  },
  {
    departmanadi: 'Endüstriyel Tasarım',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1994,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 80000,
    erasmusUlkeSayisi: 2,
    ogretimGorevlisiSayisi: 7
  },
  {
    departmanadi: 'Mimarlık',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1995,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 80000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 23
  },
  {
    departmanadi: 'SBP',
    turkiyeDevletUniSiralamasi: null,
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 210000,
    erasmusUlkeSayisi: 8,
    ogretimGorevlisiSayisi: 16
  }
]

export default function Game({ onWin }) { // onWin propunu ekledik
  const [currentDept, setCurrentDept] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  const [comparisons, setComparisons] = useState([]) // Her tahmin için karşılaştırmalar

  const startGame = () => {
    const randomDept = departments[Math.floor(Math.random() * departments.length)]
    setCurrentDept(randomDept)
    setUserInput('')
    setMessage('')
    setMessageType('')
    setComparisons([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) {
      setMessage('Lütfen bir departman adı girin.')
      setMessageType('error')
      return
    }

    const guessedDept = departments.find(
      dept => dept.departmanadi.toLowerCase() === userInput.trim().toLowerCase()
    )

    if (guessedDept) {
      if (currentDept && guessedDept.departmanadi.toLowerCase() === currentDept.departmanadi.toLowerCase()) {
        setMessage('Kazandınız!')
        setMessageType('success')
        onWin(); // Oyun kazanıldığında onWin fonksiyonunu çağır
      } else {
        // Karşılaştırılacak özellikler
        const properties = [
          { key: 'departmanadi', label:'Departman Adı', type: 'string'},
          { key: 'turkiyeDevletUniSiralamasi', label: 'Türkiye Devlet Üniversitesi Sıralaması', type: 'number' },
          { key: 'departmanAcilisYili', label: 'Departman Açılış Yılı', type: 'number' },
          { key: 'fakulteTuru', label: 'Fakülte Türü', type: 'string' },
          { key: 'yandalVeCAP', label: 'Yandal ve ÇAP Bilgisi', type: 'string' },
          { key: 'yksYaklasikSiralamasi2024', label: 'YKS Yaklaşık Sıralama 2024', type: 'number' },
          { key: 'erasmusUlkeSayisi', label: 'Erasmus Ülke Sayısı', type: 'number' },
          { key: 'ogretimGorevlisiSayisi', label: 'Öğretim Görevlisi Sayısı', type: 'number' }
        ]

        const newComparisons = properties.map(prop => {
          const guessedValue = guessedDept[prop.key]
          const targetValue = currentDept[prop.key]
          let symbol = ''
          let status = ''

          if (prop.type === 'number') {
            if (targetValue === null || guessedValue === null) {
              symbol = 'N/A'
              status = 'neutral'
            } else {
              // Özel kural: Eğer YKS Yaklaşık Sıralama 2024 arasında 17000 ile 20000 arasında ise '▲' göster
              if (prop.key === 'yksYaklasikSiralamasi2024' && guessedValue >= 17000 && guessedValue <= 20000) {
                symbol = '▲'
                status = 'within-range'
              } else {
                if (guessedValue > targetValue) {
                  symbol = '▼' // Tahmin yüksek
                  status = 'too-high'
                } else if (guessedValue < targetValue) {
                  symbol = '▲' // Tahmin düşük
                  status = 'too-low'
                } else {
                  symbol = '✔️' // Tahmin doğru
                  status = 'correct'
                }
              }
            }
          } else if (prop.type === 'string') {
            if (guessedValue.toLowerCase() === targetValue.toLowerCase()) {
              symbol = '✔️' // Tahmin doğru
              status = 'correct'
            } else {
              symbol = '✖️' // Tahmin yanlış
              status = 'incorrect'
            }
          }

          return {
            label: prop.label,
            guessedValue: prop.type === 'number' && guessedValue !== null ? guessedValue.toLocaleString('tr-TR') : guessedValue,
            symbol,
            status
          }
        })

        setComparisons([...comparisons, ...newComparisons])
        setMessage('Yanlış Tahmin. İpuçları alındı.')
        setMessageType('error')
      }
    } else {
      setMessage('Yanlış Tahmin. Böyle bir departman yok.')
      setMessageType('error')
    }

    setUserInput('')
  }

  // Tüm departman adlarını bir diziye ekleyerek datalist oluşturuyoruz
  const departmentNames = departments.map(dept => dept.departmanadi)

  return (
    <div className={styles.gameContainer}>
      {!currentDept && (
        <button className={styles.startButton} onClick={startGame}>Oyunu Başlat</button>
      )}

      {currentDept && (
        <div className={styles.gameContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
              Departman Adını Girin:
              <input
                type="text"
                list="departmanlar"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`${styles.input} ${styles.autoCompleteInput}`} // Yeni stil sınıfı eklendi
                required
                autoComplete="off"
              />
              <datalist id="departmanlar" className={styles.datalist}> // Stil sınıfı eklendi
                {departmentNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </label>
            <button type="submit" className={styles.submitButton}>Tahmin Et</button>
          </form>
          {message && (
            <p className={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
              {message}
            </p>
          )}
          {comparisons.length > 0 && (
            <div className={styles.comparisonsContainer}>
              {comparisons.map((comp, index) => (
                <div
                  key={index}
                  className={`${styles.comparisonBox} ${
                    comp.status === 'correct' ? styles.correct :
                    comp.status === 'too-high' || comp.status === 'too-low' ? styles.incorrect :
                    comp.status === 'within-range' ? styles.withinRange :
                    styles.neutral
                  }`}
                >
                  <h4>{comp.label}</h4>
                  <p>{comp.guessedValue} {comp.symbol}</p>
                </div>
              ))}
            </div>
          )}
          {messageType === 'success' && (
            <button className={styles.restartButton} onClick={startGame}>Yeni Oyun Başlat</button>
          )}
        </div>
      )}
    </div>
  )
}