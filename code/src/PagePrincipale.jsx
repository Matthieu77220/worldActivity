import { useEffect, useState } from 'react';

function PagePrincipale() {
  const [meteo, setMeteo] = useState('');
  const [meteoCode, setMeteoCode] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const aujourdHui = new Date();
  const jour = aujourdHui.getDay();
  const heure = aujourdHui.getHours();

  const dateDuJour = [
    {
      jour: 'dimanche',
      message: 'Déconnecte un peu, les idées arrivent seules.',
      theme: 0,
    },
    {
      jour: 'lundi',
      message: "Nouvelle semaine, construis quelque chose d'intéressant aujourd'hui",
      theme: 1,
    },
    {
      jour: 'mardi',
      message: "Teste, casse, améliore : c'est comme ça qu'on progresse.",
      theme: 2,
    },
    {
      jour: 'mercredi',
      message: "Petit pas aujourd'hui, grosse avancée demain.",
      theme: 3,
    },
    {
      jour: 'jeudi',
      message: "Optimise t'as journée, pas ton stress.",
      theme: 4,
    },
    {
      jour: 'vendredi',
      message: 'Testes avant de douter, ajuste après.',
      theme: 5,
    },
    {
      jour: 'samedi',
      message: 'Explore, crée, expérimente sans pression.',
      theme: 6,
    },
  ];

  const messageDuJour = dateDuJour[jour].message;

  function getJourThemeClass(jour) {
    switch (jour) {
      case 0:
        return 'theme_dimanche';
      case 1:
        return 'theme_lundi';
      case 2:
        return 'theme_mardi';
      case 3:
        return 'theme_mercredi';
      case 4:
        return 'theme_jeudi';
      case 5:
        return 'theme_vendredi';
      case 6:
        return 'theme_samedi';
      default:
        return 'theme_lundi';
    }
  }

  function getHeureThemeClass(heure) {
    if (heure >= 0 && heure <= 5) {
      return 'theme_nuit';
    }
    if (heure >= 6 && heure <= 11) {
      return 'theme_matin';
    }
    if (heure >= 12 && heure <= 17) {
      return 'theme_aprem';
    }
    if (heure >= 18 && heure <= 23) {
      return 'theme_soir';
    }
    return 'theme_matin';
  }

  function getMeteoClass(code) {
    const thunderCodes = [95, 96, 99];
    const fogCodes = [45, 48];
    const snowCodes = [71, 73, 75, 77, 85, 86];
    const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
    const cloudyCodes = [1, 2, 3];

    if (thunderCodes.includes(code)) {
      return 'meteo-orage';
    }
    if (fogCodes.includes(code)) {
      return 'meteo-brouillard';
    }
    if (snowCodes.includes(code)) {
      return 'meteo-neige';
    }
    if (rainCodes.includes(code)) {
      return 'meteo-pluie';
    }
    if (code === 0) {
      return 'meteo-ensoleille';
    }
    if (cloudyCodes.includes(code)) {
      return 'meteo-nuageux';
    }
    return 'meteo-standard';
  }

  function getMeteoLabel(code) {
    if (code === 0) return 'Ensoleillé';
    if (code === 1) return 'Peu nuageux';
    if (code === 2) return 'Partiellement nuageux';
    if (code === 3) return 'Couvert';
    if ([45, 48].includes(code)) return 'Brouillard';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Bruine';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Pluie';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Neige';
    if ([95, 96, 99].includes(code)) return 'Orage';
    return 'Météo variable';
  }

  function getTemperatureClass(tempC) {
    if (tempC === null || Number.isNaN(tempC)) {
      return 'temp-neutre';
    }
    if (tempC <= 0) {
      return 'temp-glacial';
    }
    if (tempC <= 10) {
      return 'temp-froid';
    }
    if (tempC <= 20) {
      return 'temp-frais';
    }
    if (tempC <= 28) {
      return 'temp-doux';
    }
    if (tempC <= 34) {
      return 'temp-chaud';
    }
    return 'temp-canicule';
  }

  const themeClassJour = getJourThemeClass(jour);
  const themeClassHeure = getHeureThemeClass(heure);
  const meteoClass = getMeteoClass(meteoCode);
  const temperatureClass = getTemperatureClass(temperature);

  useEffect(() => {
    let cancelled = false;

    async function fetchMeteoParis() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&current=temperature_2m,weather_code&timezone=Europe%2FParis'
        );

        if (!response.ok) {
          throw new Error(`Erreur API météo (${response.status})`);
        }

        const data = await response.json();
        const conditionCode = data?.current?.weather_code ?? null;
        const tempC = data?.current?.temperature_2m ?? null;
        const condition = getMeteoLabel(conditionCode);

        if (!cancelled) {
          setMeteo(condition);
          setMeteoCode(conditionCode);
          setTemperature(tempC);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMeteoParis();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
    <div className={`${themeClassJour} ${meteoClass} ${temperatureClass}`}>
        <div className={themeClassHeure}>
            <h2>{messageDuJour}</h2>
            {loading && <p>Chargement de la météo...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && <p>Météo à Paris : {meteo} ({temperature}°C)</p>}
        </div>
    </div>
    </>
  );
}

export default PagePrincipale;
