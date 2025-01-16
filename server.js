const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json());

let availableNumbers = [1, 2, 3, 4, 5, 6];
const users = {}; // Store selected numbers by IP (or name if needed)

app.post("/get-number", (req, res) => {
  const { name } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!name) {
    return res.status(400).send("Name is required.");
  }

  if (users[ip]) {
    return res.status(400).send("You have already selected a number.");
  }

  if (availableNumbers.length === 0) {
    return res.status(400).send("All numbers have been taken.");
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
  users[ip] = { name, number: selectedNumber }; // Track the user's IP and selected number

  res.json({ name, number: selectedNumber });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
