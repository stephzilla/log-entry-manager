import express from 'express';
import cors from 'cors';
import logEntriesRoutes from './routes/logEntries';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000' // Your frontend URL
}));
app.use(express.json());

// Routes
app.use('/api/logentries', logEntriesRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Log Entry Manager API!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});