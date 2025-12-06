import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pairDevice, getActiveSessions, startBot } from './bot.js';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/sessions', (req, res) => {
    res.json(getActiveSessions());
});

app.post('/pair', async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const code = await pairDevice(phone);
        res.json({ code });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Restore sessions on startup (Local only)
if (!process.env.VERCEL) {
    const authRoot = 'auth_info_baileys';
    if (fs.existsSync(authRoot)) {
        const dirs = fs.readdirSync(authRoot).filter(f => fs.statSync(path.join(authRoot, f)).isDirectory());
        for (const dir of dirs) {
            console.log(`Restoring session for ${dir}`);
            startBot(dir);
        }
    }
}

// Fallback for SPA or static files
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default app;
