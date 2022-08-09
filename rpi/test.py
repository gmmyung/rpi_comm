from xml.etree.ElementTree import tostring
import websocket
import _thread
import threading
import time
import rel

def on_message(ws, message):
    print("message received")

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Opened connection")



if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:4000/",
                              on_open=on_open,
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever(dispatcher=rel)  # Set dispatcher to automatic reconnection


    # rel.signal(2, rel.abort)  # Keyboard Interrupt
    # rel.dispatch()
    i = 0
    printit = lambda : {
        threading.Timer(1, printit).start(),
            ws.send("python {\"name\":0,\"pv\":0}"),
            print("sent python " + str(i))
        }
    printit()