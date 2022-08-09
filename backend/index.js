import { WebSocketServer } from 'ws';

const webSocketServer = new WebSocketServer(
    {
        //server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정한다.
        port: 4000
    }
);

var data = {
    x: [],
    y: [],
};

webSocketServer.on('connection', (ws) => {
    let interval;

    ws.on('message', (message) => {


        if (message.toString().split(' ')[0] === "python") {
            console.log("python client connected");

            let new_data = JSON.parse(message.toString().slice(message.toString().indexOf(' ') + 1));

            data.x = [...data.x, new_data.x];
            data.y = [...data.y, new_data.y];

        } else {
            console.log("web client connected");
            clearInterval(interval);
            interval = setInterval(() => {
                console.log(data);
                ws.send(JSON.stringify(data));
                console.log('sent data');
                data.x = [];
                data.y = [];
            }, 1000);

        }
    });
    ws.on('close', () => {
        console.log('disconnected');
        clearInterval(interval);
    });
});