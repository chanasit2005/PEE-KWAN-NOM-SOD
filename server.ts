import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import { Order, OrderStatus } from "./types";

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  // In-memory state
  let orders: Order[] = [];
  let isQueueLocked = false;

  // WebSocket handling
  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  wss.on("connection", (ws) => {
    console.log("Client connected");
    
    // Send initial state
    ws.send(JSON.stringify({ type: "INIT", payload: { orders, isQueueLocked } }));

    ws.on("message", (data) => {
      try {
        const { type, payload } = JSON.parse(data.toString());

        switch (type) {
          case "CREATE_ORDER":
            const newOrder = { ...payload, timestamp: Date.now() };
            orders.push(newOrder);
            broadcast({ type: "ORDER_CREATED", payload: newOrder });
            break;

          case "UPDATE_ORDER_STATUS":
            const { orderId, status } = payload;
            orders = orders.map(o => o.id === orderId ? { ...o, status } : o);
            broadcast({ type: "ORDER_UPDATED", payload: { orderId, status } });
            break;

          case "TOGGLE_LOCK":
            isQueueLocked = payload;
            broadcast({ type: "LOCK_UPDATED", payload: isQueueLocked });
            break;
            
          case "CLEAR_ORDERS":
            orders = [];
            broadcast({ type: "INIT", payload: { orders, isQueueLocked } });
            break;
        }
      } catch (err) {
        console.error("WS Message Error:", err);
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
