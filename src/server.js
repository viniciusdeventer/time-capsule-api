import express from 'express';
import dotenv from 'dotenv';
import capsuleRoutes from './routes/capsuleRoutes.js';
import './jobs/sendCapsules.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(capsuleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
