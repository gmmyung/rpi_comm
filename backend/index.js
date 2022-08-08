const express = require('express');
const app = express();

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.use("/", (req, res) => {
    res.sendFile('./index.html');
});

const HTTPServer = app.listen(3000, () => {
    console.log("Server is open at port:3000");
});

const wsModule = require('ws');

const webSocketServer = new wsModule.Server(
    {
        server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정한다.
        // port: 3000
    }
);

webSocketServer.on('connection', (ws) => {
    console.log("Connected");
    ws.on('message', (message) => {
        console.log(message.toString());
    });
});

// rl.on('line', (input)=>{
//     webSocketServer.clients.forEach((client)=>{
//         client.send(input);
//     }
//     );
// });