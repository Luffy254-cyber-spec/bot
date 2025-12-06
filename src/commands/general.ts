
import { Command } from '../types.js';

export const generalCommands: Command[] = [
    {
        name: 'ping',
        category: 'general',
        execute: async ({ sock, from }) => {
            await sock.sendMessage(from, { text: 'Pong! 🏓' });
        }
    },
    {
        name: 'uptime',
        category: 'general',
        execute: async ({ sock, from }) => {
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            await sock.sendMessage(from, { text: `⏱️ Runtime: ${hours}h ${minutes}m ${seconds}s` });
        }
    }
];
