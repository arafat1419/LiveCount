import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import CORS middleware

const app = express();
const port = 3000;

app.use(cors()); // Use CORS middleware

app.get('/proxy/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await fetch(`https://api.livecounts.io/youtube-live-subscriber-counter/stats/${id}`, {
            method: 'GET',
            headers: {
                'Origin': 'https://livecounts.io',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
