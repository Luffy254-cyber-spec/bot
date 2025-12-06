
import { WASocket, WAMessage } from '@whiskeysockets/baileys';

export interface CommandContext {
    sock: WASocket;
    msg: WAMessage;
    args: string[];
    from: string;
    sender: string;
    isGroup: boolean;
    isAdmin: boolean;
    isBotAdmin: boolean;
}

export interface Command {
    name: string;
    aliases?: string[];
    category: string;
    description?: string;
    execute: (ctx: CommandContext) => Promise<void>;
}
