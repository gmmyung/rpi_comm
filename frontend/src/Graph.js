import React from 'react'
import Plot from 'react-plotly.js';


function Graph(props) {
    console.log(props.data);
    return (
    <Plot data={[props.data]} layout={{width: 500, height: 500, title: 'My Plot'}}/>
    )
}

export default Graph;