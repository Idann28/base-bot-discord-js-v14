// ─── Module Imports ───
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// ─── Client Initialization ───
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});
const prefix = "!";

// ─── Ready Event ───
client.on('ready', () => {
    console.clear();
    console.log(`Bot telah online sebagai ${client.user.tag}`);  
});

// ─── Message Event ───
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const logcmd = `
╭──────────────────────────────────────────────╮
│ Command  : ${prefix}${command} ${args.join(' ')} 
│ User     : ${message.author.tag} (${message.author.id})
│ Channel  : #${message.channel.name} (${message.channelId})
│ Guild    : ${message.guild.name ? message.guild.name + " " : "" }(${message.guild.id ? message.guild.id : "DM"})
│ Timestamp: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false })} WIB 
╰──────────────────────────────────────────────╯`;
    console.log(logcmd);

    // ─── Command Handling ───
    if (command === 'ping') {
        const sentMessage = await message.reply({ content: 'Tunggu sebentar...' }); 
        const pingEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true },
                { name: 'API Latency', value: `${sentMessage.createdTimestamp - message.createdTimestamp}ms`, inline: true }
            );

        await sentMessage.edit({ content: '', embeds: [pingEmbed] });
    }
});

// ─── Login ───
client.login(process.env.TOKEN);
