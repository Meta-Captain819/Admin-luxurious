let clients = [];

const handler = (req, res) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Add this client to the list of subscribers
    clients.push(res);

    // Remove the client when the connection closes
    req.on("close", () => {
      clients = clients.filter((client) => client !== res);
    });
  }
};

// Function to broadcast events to all clients
const broadcast = (event) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(event)}\n\n`);
  });
};

// Simulated database change (for testing purposes)
setInterval(() => {
  broadcast({
    type: "newOrder",
    data: {
      orderId: Math.random().toString(36).substr(2, 9),
      customer: "John Doe",
      totalAmount: "$250",
      status: "Placed",
      createdAt: new Date(),
    },
  });
}, 15000); // Sends a new event every 15 seconds for testing

export default handler;
