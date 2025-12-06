
import { Command } from '../types.js';

export const downloadCommands: Command[] = [
    {
        name: 'play',
        category: 'download',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: '🎵 Searching for song... (Simulation)' });
            await new Promise(r => setTimeout(r, 1500));
            await sock.sendMessage(from, { text: '▶️ Sending audio... (Simulation)' });
        }
    },
    {
        name: 'tiktok',
        category: 'download',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: '📥 Downloading TikTok video... (Simulation)' });
            await new Promise(r => setTimeout(r, 1500));
            await sock.sendMessage(from, { text: '✅ Video sent.' });
        }
    }
];
