
import { Command } from '../types.js';

export const funCommands: Command[] = [
    {
        name: 'dare',
        category: 'fun',
        execute: async ({ sock, from }) => {
            const dares = [
                "Dance with no music for 1 minute.",
                "Send a funny selfie.",
                "Say 'I love you' to your crush."
            ];
            const random = dares[Math.floor(Math.random() * dares.length)];
            await sock.sendMessage(from, { text: `🔥 *Dare:* ${random}` });
        }
    },
    {
        name: 'truth',
        category: 'fun',
        execute: async ({ sock, from }) => {
            const truths = [
                "What is your biggest fear?",
                "Who is your crush?",
                "What is the most embarrassing thing you've done?"
            ];
            const random = truths[Math.floor(Math.random() * truths.length)];
            await sock.sendMessage(from, { text: `🔮 *Truth:* ${random}` });
        }
    },
    {
        name: 'bible',
        category: 'religion',
        execute: async ({ sock, from }) => {
            await sock.sendMessage(from, { text: '📖 *Bible Verse:* "For God so loved the world..." (John 3:16)' });
        }
    },
    {
        name: 'quran',
        category: 'religion',
        execute: async ({ sock, from }) => {
            await sock.sendMessage(from, { text: '📖 *Quran Verse:* "In the name of Allah, current chapter..."' });
        }
    }
];
