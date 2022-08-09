import express from 'express';
import { WebSocketServer } from 'ws';

var data = [];

function createServer() {
    const app = express();

    app.use("/", (req, res) => {
        res.sendFile('./index.html');
    });

    const HTTPServer = app.listen(4000, () => {
        console.log("Server is open at port:4000");
    });

    const webSocketServer = new WebSocketServer(
        {
            server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정한다.
            // port: 3000
        }
    );

    webSocketServer.on('connection', (ws) => {
        console.log("Connected");
        ws.on('message', (message) => {
            if (message.toString().split(' ')[0] === "python") {
                ws.send("You are a python");
                
                data.push(JSON.parse(message.toString().split(' ')[1]));
                console.log(data);
            } 
        });
        // let initialTime = Date.now()
        // setInterval(() => {
        //     let timeoffset = Date.now() - initialTime;
        // ws.send(`{ "name": ${timeoffset}, "pv": ${timeoffset}}`);
        // console.log("sent");
        // }, 1000);
    });

    return webSocketServer;
}

export default createServer;