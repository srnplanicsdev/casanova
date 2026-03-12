const ws = new WebSocket("ws://localhost:3000");
ws.addEventListener("open",
    ()=>{
        console.log("Connected to WebSocket server");
    }
)
ws.addEventListener("message",
    (message)=>{
        console.log("Received message:", message.data);
    }
)
ws.addEventListener("close",
    ()=>{
        console.log("Disconnected from WebSocket server");
    }
)
ws.addEventListener("error",
    (error)=>{
        console.error("WebSocket error:", error);
    }
)


export default ws