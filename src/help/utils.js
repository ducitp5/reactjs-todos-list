import React from "react";

export const renderDailyHours = () => {
    const options = [];

    for (let i = 0; i < 24; i++) {
        options.push(<option key={i} value={i}>{i}h</option>);
    }

    return options;
}

export const levelMap =
{
    0: {'levelLabel': 'Low', 'cssStyle':  'badge-primary' },
    1: {'levelLabel': 'Medium', 'cssStyle':  'badge-danger' },
    2: {'levelLabel': 'High', 'cssStyle':  'badge-secondary' },
    3: {'levelLabel': 'Very High', 'cssStyle':  'badge-secondary' },
}

export function getLevelLabel(levelNumber){

    return levelMap[levelNumber]?.levelLabel ?? 'Unknown';
}

export const renderLevelDifficult = () => {
    return Object.entries(levelMap).map(
        ([key, level]) => (
            <option key={key} value={key}>{level.levelLabel}</option>
        )
    );
}

export const renderLevelSelectButton = (handleLevelSelect) => {

    let $levelMapArray = Object.entries(levelMap);

    return $levelMapArray.map(
        function ([levelNumber, levelObject], index, arrayOrigine) {
            let $buttons =
            (
                <button key={levelNumber} className="dropdown-item"
                        onClick={() => handleLevelSelect ? handleLevelSelect(Number(levelNumber)) : alert('handleLevelSelect not defined')}>
                    {levelObject.levelLabel}
                </button>
            );
            return $buttons;
        }
    );
}

