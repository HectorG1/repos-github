import { useTranslation } from 'react-i18next';

import './languageSwitch.css';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  return (
    <div className="languageSwitch">
      <label className="switchControl">
        <input type="checkbox" checked={isEnglish} onChange={toggleLanguage} />
        <span className="sliderTrack"></span>
      </label>
      <span className="languageLabel">{isEnglish ? 'English' : 'Español'}</span>
    </div>
  );
}
