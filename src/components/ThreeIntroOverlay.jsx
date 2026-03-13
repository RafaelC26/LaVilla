import { useEffect, useRef, useState } from "react";

function ThreeIntroOverlay({ onComplete, language = "es", duration = 2600, logoImg }) {
  const completeTimeoutRef = useRef(null);
  const doneRef = useRef(false);
  const orbitalRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [travelStyle, setTravelStyle] = useState(null);

  const finishWithTransition = () => {
    if (doneRef.current) {
      return;
    }

    doneRef.current = true;

    const orbitalNode = orbitalRef.current;
    const targetNode = document.querySelector(".navbar .logoImg") || document.querySelector(".navbar .logo");

    if (orbitalNode && targetNode) {
      const sourceRect = orbitalNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();
      const shiftX = (targetRect.left + (targetRect.width / 2)) - (sourceRect.left + (sourceRect.width / 2));
      const shiftY = (targetRect.top + (targetRect.height / 2)) - (sourceRect.top + (sourceRect.height / 2));
      const scale = Math.max(0.28, Math.min(0.62, (targetRect.height / sourceRect.height) * 1.08));

      setTravelStyle({
        "--intro-shift-x": `${shiftX}px`,
        "--intro-shift-y": `${shiftY}px`,
        "--intro-scale": `${scale}`
      });
    }

    setIsLeaving(true);
    window.setTimeout(() => {
      onComplete?.();
    }, 980);
  };

  useEffect(() => {
    const finishIntro = () => {
      finishWithTransition();
    };

    completeTimeoutRef.current = window.setTimeout(finishIntro, duration);

    return () => {
      if (completeTimeoutRef.current) {
        window.clearTimeout(completeTimeoutRef.current);
      }
    };
  }, [duration, onComplete]);

  const handleSkip = () => {
    if (completeTimeoutRef.current) {
      window.clearTimeout(completeTimeoutRef.current);
    }

    finishWithTransition();
  };

  return (
    <div
      className={`threeIntroOverlay ${isLeaving ? "leaving" : ""}`}
      role="dialog"
      aria-label="Intro animation"
      style={travelStyle || undefined}
    >
      <div className="threeIntroStage">
        <div className="threeIntroOrbital" aria-hidden="true" ref={orbitalRef}>
          <span className="threeIntroOrbitBase" />
          <span className="threeIntroOrbitSpinner" />
          <div className="threeIntroLogoCore">
            {logoImg ? (
              <img src={logoImg} alt="" className="threeIntroLogoMark" />
            ) : (
              <span className="threeIntroLogoFallback">LV</span>
            )}
          </div>
        </div>

        <div className="threeIntroWordmark">
          <p className="threeIntroBadge">{language === "es" ? "Cargando experiencia" : "Loading experience"}</p>
          <h1>LA VILLA</h1>
          <p>{language === "es" ? "Esencia de Boyaca" : "Essence of Boyaca"}</p>
        </div>
      </div>
      {/* Botón de saltar intro eliminado */}
    </div>
  );
}

export default ThreeIntroOverlay;
