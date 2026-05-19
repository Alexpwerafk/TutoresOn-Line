import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import matchRoutes from './routes/match.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/match', matchRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TutoresOn-Line API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
