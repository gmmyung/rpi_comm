import { WebSocketServer } from 'ws';

const webSocketServer = new WebSocketServer(
    {
        //server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정한다.
        port: 4000
    }
);

var data = {};

webSocketServer.on('connection', (ws) => {
    let interval;

    ws.on('message', (message) => {
        

        if (message.toString().split(' ')[0] === "python") {
            console.log("python client connected");

            data = JSON.parse(message.toString().split(' ')[1]);
            console.log(data);
        } else {
            console.log("web client connected");
            clearInterval(interval);
            interval = setInterval(() => {
                ws.send(JSON.stringify(data));
                console.log('sent data');
            }, 1000);
        }
    });
    ws.on('close', () => {
        console.log('disconnected');
        clearInterval(interval);
    });
});