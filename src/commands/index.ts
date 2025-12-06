
import { Command } from '../types.js';
import { menuCommand } from './menu.js';
import { generalCommands } from './general.js';
import { hackCommands } from './hack.js';
import { aiCommands } from './ai.js';
import { groupCommands } from './group.js';
import { downloadCommands } from './download.js';
import { funCommands } from './fun.js';
import { mediaCommands } from './media.js';
import { toolsCommands } from './tools.js';

const commands = new Map<string, Command>();

function registerCommand(cmd: Command) {
    commands.set(cmd.name, cmd);
    if (cmd.aliases) {
        cmd.aliases.forEach(alias => commands.set(alias, cmd));
    }
}

// Register all commands here
[
    menuCommand,
    ...generalCommands,
    ...hackCommands,
    ...aiCommands,
    ...groupCommands,
    ...downloadCommands,
    ...funCommands,
    ...mediaCommands,
    ...toolsCommands
].forEach(registerCommand);

export { commands };

// Refresh commands
