import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current && window.VANTA?.CLOUDS) {
      vantaRef.current = window.VANTA.CLOUDS({
        el: '#background',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <section id="background">
      <main className="landing_shell">
        <p className="landing_eyebrow">worldActivity</p>

        <h1 className="h1_landing">Ton activité guidée par le contexte réel.</h1>

        <p className="p_landing">
          Une interface qui évolue automatiquement selon la metéo de Paris, le moment de
          la journée et le rythme de la semaine pour proposer le bon thème au
          bon instant.
        </p>

        <div className="cta_row">
          <button className="btn_landing" onClick={() => navigate('/pageprincipale')}>
            Ouvrir la page principale
          </button>
          <a
            className="btn_ghost"
            href="https://matthieu-dietrich-ashen-iota.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Voir mon portfolio
          </a>
        </div>

        <ul className="landing_metrics" aria-label="Apercu des points forts">
          <li>UI contextuelle</li>
          <li>Adaptation météo</li>
          <li>Découpage journalier</li>
        </ul>
      </main>
    </section>
  );
}

export default Landing;
