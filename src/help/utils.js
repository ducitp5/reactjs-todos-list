import React from "react";

export const renderDailyHours = () => {
    const options = [];

    for (let i = 0; i < 24; i++) {
        options.push(<option key={i} value={i}>{i}h</option>);
    }
    console.log('<options> - ', options)
    return options;
}