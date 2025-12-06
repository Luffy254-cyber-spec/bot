
import { Command } from '../types.js';

export const toolsCommands: Command[] = [
    {
        name: 'calculate',
        category: 'tools',
        execute: async ({ sock, from, args }) => {
            try {
                const expression = args.join("");
                // Dangerous in production, but okay for simulation/simple math demo if input is sanitized
                // Using a safe alternative would be better, but for now just simulation
                await sock.sendMessage(from, { text: `🧮 Result: ${expression} = (Calculated Value)` });
            } catch {
                await sock.sendMessage(from, { text: '❌ Invalid expression' });
            }
        }
    },
    {
        name: 'translate',
        category: 'tools',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: `🌐 Translating "${args.join(" ")}"... (Simulation)` });
        }
    },
    {
        name: 'block',
        category: 'owner',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: '🚫 User blocked. (Simulation)' });
        }
    },
    {
        name: 'setbio',
        category: 'settings',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: '✅ Bio updated. (Simulation)' });
        }
    },
    {
        name: 'weather',
        category: 'search',
        execute: async ({ sock, from, args }) => {
            await sock.sendMessage(from, { text: '🌦️ Weather report: Sunny, 25°C. (Simulation)' });
        }
    }
];
