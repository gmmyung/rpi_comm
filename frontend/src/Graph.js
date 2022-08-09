import {LineChart, Line, CartesianGrid} from 'recharts'
import React from 'react'


function Graph(props) {
    return (
    <LineChart width={600} height={300} data={props.data}>
        <Line type="linear" dataKey="pv" stroke="#8884d8" isAnimationActive={false}/>
        <CartesianGrid stroke="#ccc" />
    </LineChart>
    )
}

export default Graph;