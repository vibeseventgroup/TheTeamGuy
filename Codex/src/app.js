import express from 'express';
import cors from 'cors';
import homepageRoutes from './routes/homepageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import vibesRoutes from './routes/vibesRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import communicationsRoutes from './routes/communicationsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/homepage', homepageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vibes', vibesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/communications', communicationsRoutes);

app.use(errorHandler);

export default app;
