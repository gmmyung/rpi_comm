import './App.css';
import Graph from './Graph';
import React from 'react';
import { useState, useEffect } from 'react';


function App() {

  const [wsconnected, setWsconnected] = useState(false);
  const [data, setData] = useState([]);

  const initWs = () => {
    let ws = new WebSocket('ws://localhost:4000/ws');
    ws.onopen = function (event) {
      console.log('connected');
      setWsconnected(true);
      ws.send('web');
    }
    ws.onmessage = function (event) {
      console.log(event.data);
      setData((prev) => [...prev, JSON.parse(event.data)]);
    }
    ws.onclose = function (event) {
      console.log('disconnected');
      setWsconnected(false);
    }
  }

  useEffect(initWs, []);

  return (
    <div className="App">
      {wsconnected ? <Graph data={data} /> : 
      <div>Loading...
        <button onClick={initWs}>Reload</button>
      </div>
        }
    </div>
  );
}

export default App;
