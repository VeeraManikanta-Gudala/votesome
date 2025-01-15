const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let contestants = [
  { id: 1, name: 'Cats', votes: 0 },
  { id: 2, name: 'Dogs', votes: 0 },
  { id: 3, name: 'tiger',votes: 0},
  { id: 4, name: 'lion',votes: 0}

];

// Get all contestants
app.get('/contestants', (req, res) => {
  res.json(contestants);
});

// Cast a vote
app.post('/vote', (req, res) => {
  const { id } = req.body;
  const contestant = contestants.find((c) => c.id === id);
  if (contestant) {
    contestant.votes += 1;
    res.status(200).json({ message: 'Vote counted successfully!' });
  } else {
    res.status(404).json({ message: 'Contestant not found' });
  }
});

// Reset votes (optional for debugging)
app.post('/reset', (req, res) => {
  contestants = contestants.map((c) => ({ ...c, votes: 0 }));
  res.status(200).json({ message: 'Votes reset successfully!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});