import express from 'express';
import {WebSocketServer} from 'ws';

function createServer() {
    const app = express();

    app.use("/", (req, res) => {
        res.sendFile('./index.html');
    });

    const HTTPServer = app.listen(3000, () => {
        console.log("Server is open at port:3000");
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
            console.log(message.toString());
        });
    });

    return app;
}

export default createServer;