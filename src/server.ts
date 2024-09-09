import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory storage for favorites
let favorites: { zipCode: string; location: string }[] = [];

// Routes
app.get('/favorites', (req, res) => {
  res.json(favorites);
});

app.post('/favorites', (req, res) => {
  console.log(req.body);
  const { zipCode, location } = req.body;
  if (!zipCode || !location) {
    return res.status(400).json({ error: 'Zip code and location are required' });
  }
  const existingIndex = favorites.findIndex(fav => fav.zipCode === zipCode);
  if (existingIndex !== -1) {
    return res.status(400).json({ error: 'Favorite already exists' });
  }
  const newFavorite = { zipCode, location };
  favorites.push(newFavorite);
  res.status(201).json(newFavorite);
  console.log(`Favorite added: ${zipCode} - ${location}`);
});

app.delete('/favorites/:zipCode', (req, res) => {
  const { zipCode } = req.params;
  const index = favorites.findIndex(fav => fav.zipCode === zipCode);
  if (index === -1) {
    return res.status(404).json({ error: 'Favorite not found' });
  }
  favorites.splice(index, 1);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
