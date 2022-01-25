import React, { useState, useEffect } from 'react'
import './BarChart.css'


const BarChart = ({ data }) => {
    const barChartStyle = {
        backgroundColor: '#dedede',
        width: '100px',
        minHeight: '2px',
        height: `${data.population / 5000000}px`
    };

    return (

        <>
            <div>{parseInt(data.population).toLocaleString()} </div>
            <div className="single-bar-chart">
                <div style={barChartStyle}></div>
                <div>{data.name}</div>
            </div>
        </>
    )

}

export default BarChart 