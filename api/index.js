import config from 'dotenv';
import debug from 'debug';
import express from 'express';
import BookRoutes from './server/routes/BookRoutes';

config.config();

const app = express();
const DEBUG = debug('http');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/books', BookRoutes);

app.get('*', (req, res) => res.status(200).json({ message: 'Books API...' }));

app.listen(PORT, () => DEBUG(`Server running on port ${PORT}`));

export default app;
