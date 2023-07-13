import React, { useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale
} from 'chart.js';
import { Radar, Bubble } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale
);




export function TrendGraph({ trends }) {
    const trendKeys = Object.keys(trends);
    const [currentTrend, setCurrentTrend] = useState(trendKeys[0]);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
    };

    const datasets = Object.keys(trends).map((keyword) => ({
        label: keyword,
        data: [
            {
                x: trends[keyword].impacto,
                y: trends[keyword].tiempo_adopcion,
                r: trends[keyword].estimación_inversion,
            },
        ],
        backgroundColor: "aquamarine",
    }));

    const data_full = {
        datasets: datasets,
    };



    // const data_full = {
    //     labels: Object.keys(trends[trendKeys[0]]), // Assuming all trends have the same keys
    //     datasets: trendKeys.map((trendKey) => ({
    //         label: trendKey,
    //         data: Object.values(trends[trendKey]),
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)', // green
    //         borderColor: 'rgba(75, 192, 192, 1)', // green
    //         borderWidth: 1,
    //     })),
    // };

    const data = {
        labels: Object.keys(trends[currentTrend]),
        datasets: [
            {
                label: currentTrend,
                data: Object.values(trends[currentTrend]),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleNextClick = () => {
        const currentIndex = trendKeys.indexOf(currentTrend);
        const nextIndex = (currentIndex + 1) % trendKeys.length;
        setCurrentTrend(trendKeys[nextIndex]);
    }

    const handlePrevClick = () => {
        const currentIndex = trendKeys.indexOf(currentTrend);
        const prevIndex = (currentIndex - 1 + trendKeys.length) % trendKeys.length;
        setCurrentTrend(trendKeys[prevIndex]);
    }

    return (
        <div>
            <h1>Trend Graph</h1>
            <Bubble options={options} data={data_full}/>
            <h1>{currentTrend}</h1>
            <button onClick={handlePrevClick}>Previous Trend</button>
            <button onClick={handleNextClick}>Next Trend</button>
            <Radar data={data} />
        </div>
    );
}

