
import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { commands } from './commands/index.js';

// Store active sessions
const sessions = new Map<string, WASocket>();

export function getActiveSessions() {
    return Array.from(sessions.keys());
}

export async function startBot(phoneNumber: string, readdir = false) {
    const authDir = process.env.VERCEL
        ? path.join('/tmp/auth_info_baileys', phoneNumber)
        : path.join('auth_info_baileys', phoneNumber);

    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }) as any,
        printQRInTerminal: false,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    sessions.set(phoneNumber, sock);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startBot(phoneNumber); // Auto-reconnect
            } else {
                sessions.delete(phoneNumber);
                console.log(`Session ${phoneNumber} logged out`);
            }
        } else if (connection === 'open') {
            console.log(`Bot ${phoneNumber} connected`);
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || m.type !== 'notify') return;

        const content = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        const from = msg.key.remoteJid;
        if (!from) return;

        // Command Handler
        if (content.startsWith('.')) {
            const args = content.slice(1).trim().split(/ +/);
            const cmdName = args.shift()?.toLowerCase();

            if (!cmdName) return;

            const command = commands.get(cmdName);

            if (command) {
                try {
                    await command.execute({
                        sock,
                        msg,
                        args,
                        from,
                        sender: msg.key.participant || from,
                        isGroup: from.endsWith('@g.us'),
                        isAdmin: false, // TODO: Implement admin check
                        isBotAdmin: false // TODO: Implement bot admin check
                    });
                } catch (e) {
                    console.error(`Error executing command ${cmdName}:`, e);
                    await sock.sendMessage(from, { text: '❌ Error executing command' });
                }
            }
        }
    });

    return sock;
}

// Wrapper for pairing flow
export async function pairDevice(phoneNumber: string): Promise<string> {
    const sock = await startBot(phoneNumber);

    return new Promise<string>((resolve, reject) => {
        setTimeout(async () => {
            try {
                if (!sock.authState.creds.registered) {
                    const code = await sock.requestPairingCode(phoneNumber);
                    resolve(code);
                } else {
                    resolve("Already Registered");
                }
            } catch (err: any) {
                reject(err);
            }
        }, 3000);
    });
}
