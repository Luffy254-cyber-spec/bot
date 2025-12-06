
import { Command } from '../types.js';

export const groupCommands: Command[] = [
    {
        name: 'hidetag',
        category: 'group',
        execute: async ({ sock, from, msg, args, isGroup }) => {
            if (!isGroup) {
                await sock.sendMessage(from, { text: '❌ Group command only.' });
                return;
            }
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants.map(p => p.id);
            const text = args.join(' ') || "Attention Everyone!";

            await sock.sendMessage(from, { text: text, mentions: participants });
        }
    },
    {
        name: 'kick',
        category: 'group',
        execute: async ({ sock, from, msg, args, isGroup }) => {
            if (!isGroup) return;
            // Basic kick logic (requires admin check in real scenario)
            // Check mentions
            const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
            if (mentions.length > 0) {
                await sock.groupParticipantsUpdate(from, mentions, "remove");
                await sock.sendMessage(from, { text: '✅ Kicked user(s).' });
            } else {
                await sock.sendMessage(from, { text: '❌ Mention a user to kick.' });
            }
        }
    },
    {
        name: 'add',
        category: 'group',
        execute: async ({ sock, from, args, isGroup }) => {
            if (!isGroup) return;
            const number = args[0];
            if (!number) {
                await sock.sendMessage(from, { text: '❌ Provide a number to add.' });
                return;
            }
            const jid = number.includes('@s.whatsapp.net') ? number : `${number.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
            await sock.groupParticipantsUpdate(from, [jid], "add");
            await sock.sendMessage(from, { text: '✅ Added user.' });
        }
    }
];
