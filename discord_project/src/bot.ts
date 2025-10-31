// Entry point for the Discord bot. Initializes client and loads commands/events.
// filepath: /home/zachary/Desktop/zachhightower.com/discord_project/src/bot.ts

// Install dependencies with: npm install discord.js dotenv
   import { Client, GatewayIntentBits } from 'discord.js';
   import dotenv from 'dotenv';

   dotenv.config();

   const client = new Client({
     intents: [
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMessages,
       GatewayIntentBits.MessageContent,
     ],
   });

   client.once('ready', () => {
     console.log(`Logged in as ${client.user?.tag}`);
   });

   client.login(process.env.DISCORD_TOKEN);