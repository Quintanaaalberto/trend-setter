import React, { useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function TrendGraph({ trends }) {
    const trendKeys = Object.keys(trends);
    const [currentTrend, setCurrentTrend] = useState(trendKeys[0]);

    const colors = [
        'rgba(255, 99, 132, 0.2)', // red
        'rgba(54, 162, 235, 0.2)', // blue
        'rgba(255, 206, 86, 0.2)', // yellow
        'rgba(75, 192, 192, 0.2)', // green
        'rgba(153, 102, 255, 0.2)' // purple
    ];

    const borderColors = [
        'rgba(255, 99, 132, 1)', // red
        'rgba(54, 162, 235, 1)', // blue
        'rgba(255, 206, 86, 1)', // yellow
        'rgba(75, 192, 192, 1)', // green
        'rgba(153, 102, 255, 1)' // purple
    ];

    // Function to shuffle an array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const shuffledColors = shuffle(colors);
    const shuffledBorderColors = shuffle(borderColors);


    const data_full = {
        labels: Object.keys(trends[trendKeys[0]]), // Assuming all trends have the same keys
        datasets: trendKeys.map((trendKey) => ({
            label: trendKey,
            data: Object.values(trends[trendKey]),
            backgroundColor:         'rgba(75, 192, 192, 0.2)', // green
            borderColor: 'rgba(75, 192, 192, 1)', // green
            borderWidth: 1,
        })),
    };

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
            <Radar data={data_full}/>
            <h1>{currentTrend}</h1>
            <button onClick={handlePrevClick}>Previous Trend</button>
            <button onClick={handleNextClick}>Next Trend</button>
            <Radar data={data} />
        </div>
    );
}

