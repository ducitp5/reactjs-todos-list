// src/components/LanguageToggle.js
import React from 'react';

const LanguageToggle = ({ t, togglei18nextLanguage, toggleStaticLanguage }) => (
    <div>
        <button onClick={togglei18nextLanguage} className="btn btn-primary">
            {t('switchLanguage')} - i18next
        </button>

        <button onClick={toggleStaticLanguage} className="btn btn-secondary">
            {t('switchLanguage')} - Static
        </button>
    </div>
);

export default LanguageToggle;
