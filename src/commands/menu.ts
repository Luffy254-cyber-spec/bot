
import { Command } from '../types.js';

export const menuCommand: Command = {
    name: 'menu',
    aliases: ['help', 'h', 'start'],
    category: 'general',
    execute: async ({ sock, from }) => {
        const menuText = `⫷👑 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 👑⫸
║ 🧑 promise
║ 🤖 ICON LITTLE MD
║ 📡 Status: Online
║ ⏱️ Runtime: ${Math.floor(process.uptime())}s
║ 👑 Owner: 𝐈𝐂𝐎𝐍
║ 💻 Version: 1.0.1
║ 💨 Host: panel
⫸━━━━━━━━━━━━━⫷

▓━ group menu ━▓
│➤ .hidetag
│➤ .tagall
│➤ .demote
│➤ .promote
│➤ .mute
│➤ .unmute
│➤ .join
│➤ .poll
│➤ .kick
│➤ .left
│➤ .add
│➤ .linkgc
│➤ .groupjid
│➤ .getpp
│➤ .kickall
│➤ .everyone
│➤ .resetlink
│➤ .totag
│➤ .closetime
│➤ .opentime
│➤ .antilink

▓━ download menu ━▓
│➤ .hd/remini
│➤ .apk
│➤ .play
│➤ .img
│➤ .imdb
│➤ .animedl
│➤ .tiktok
│➤ .gitclone
│➤ .toimg
│➤ .ytsearch
│➤ .tiktokgirl
│➤ .tiktoksantuy
│➤ .tiktoksexy
│➤ .tiktokbocil
│➤ .tiktokghea
│➤ .tiktokkayes
│➤ .tiktokpanrika
│➤ .tiktoknot
│➤ .xnxxsearch
│➤ .coffee
│➤ .idch

▓━ sticker menu ━▓
│➤ .take
│➤ .brat
│➤ .cry
│➤ .kill
│➤ .hug
│➤ .happy
│➤ .dance
│➤ .handhold
│➤ .highfive
│➤ .slap
│➤ .kiss
│➤ .blush
│➤ .bite
│➤ .cuddle
│➤ .furbrat
│➤ .shinobu
│➤ .bonk
│➤ .pat
│➤ .nom

▓━ anime menu ━▓
│➤ .nwaifu
│➤ .waifu
│➤ .animekill
│➤ .animelick
│➤ .animebite
│➤ .animeglomp
│➤ .animehappy
│➤ .animedance
│➤ .animecringe
│➤ .animehighfive
│➤ .animepoke
│➤ .animewink
│➤ .animesmile
│➤ .animesmug
│➤ .animewlp
│➤ .animesearch
│➤ .animeavatar

▓━  Bug menu  ━▓
│➤ .Xandro
│➤ .Xios
│➤ .Xgrup
│➤ .Clearbugs
│➤ .Icon-hijack

▓━ others menu ━▓
│➤ .ss/ssweb
│➤ .broadcastimage
│➤ .broadcasttext
│➤ .broadcastvid
│➤ .ban
│➤ .unban
│➤ .jid
│➤ .vv
│➤ .vv2
│➤ .weather
│➤ .fact
│➤ .createlogo
│➤ .clear
│➤ .shorturl
│➤ .tr
│➤ .pickupline
│➤ .autorecording 
│➤ .autotyping 
│➤ .autoviewstatus
│➤ .autolikestatus
│➤ .delete
│➤ .block
│➤ .unblock
│➤ .setbio
│➤ .ai
│➤ .joke
│➤ .truth
│➤ .dare
│➤ .qc
│➤ .gptimage
│➤ .tovn
│➤ .say
│➤ .self
│➤ .public
┗━━━━━━━━━━━━▓

╭⭑━━━➤ ʜᴀᴄᴋ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐡𝐠𝐜  
┣ ◁️⚡💥 𝐡𝐚𝐜𝐤𝐠𝐜  
┣ ◁️⚡💥 𝐡𝐚𝐜𝐤𝐜𝐨𝐧𝐭𝐚𝐜𝐭  
╰━━━━━━━━━━━━━━━━━━╯

╔⭑★⭑★⭑★⭑★⭑★⭑★⭑★⭑╗
📂 *AVAILABLE CATEGORIES*
1. AI MENU
2. AUDIO MENU
3. DOWNLOAD MENU
4. EPHOTO360 MENU
5. FUN MENU
6. GROUP MENU
7. IMAGE MENU
8. MULTISESSION MENU
9. OTHER MENU
10. OWNER MENU
11. RELIGION MENU
12. SEARCH MENU
13. SETTINGS MENU
14. SPORTS MENU
15. SUPPORT MENU
16. TOOLS MENU
17. VIDEO MENU
╚⭑★⭑★⭑★⭑★⭑★⭑★⭑★⭑╝
`;
        await sock.sendMessage(from, { text: menuText });
    }
};
