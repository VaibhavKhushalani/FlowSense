import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

type Message = {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
};

let messages: Message[] = [];

// Simulated Kafka message generator
function generateFakeKafkaMessage(): Message {
  const now = new Date();
  return {
    store_id: 10,
    customers_in: Math.floor(Math.random() * 3),
    customers_out: Math.floor(Math.random() * 3),
    time_stamp: now.toISOString(),
  };
}

// Push a new message every 10 seconds
setInterval(() => {
  const msg = generateFakeKafkaMessage();
  messages.push(msg);
  console.log("New Kafka Message:", msg);
}, 10000);

// GET /api/live - last 10 messages
app.get("/api/live", (req, res) => {
  res.json(messages.slice(-10));
});

// GET /api/history - hourly stats for last 24 hours
app.get("/api/history", (req, res) => {
  const now = new Date();
  const stats: { hour: string; customers_in: number; customers_out: number }[] =
    [];

  for (let i = 23; i >= 0; i--) {
    const hourStart = new Date(now);
    hourStart.setMinutes(0, 0, 0);
    hourStart.setHours(now.getHours() - i);

    const hourLabel = hourStart.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"

    const hourMsgs = messages.filter((m) => m.time_stamp.startsWith(hourLabel));

    stats.push({
      hour: hourLabel,
      customers_in: hourMsgs.reduce((sum, m) => sum + m.customers_in, 0),
      customers_out: hourMsgs.reduce((sum, m) => sum + m.customers_out, 0),
    });
  }

  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
