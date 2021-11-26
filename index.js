const discord = require("discord.js");
const fs = require("fs");
const data = require("croxydb");
const client = new discord.Client();
client.db = data;
client.commands = new discord.Collection();
client.logger = console;

client.on('ready', () => {
  client.logger.log('bot is ready.');
  client.user.setStatus("idle");
  if (!Array.isArray(client.db.get("gws"))) {
    client.db.set("gws", []);
  }
});

client.on('message', async (message) => {
    let prefix = "?"; // change here
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    client.logger.log(`${message.author.tag} -> used ${command}. `)
    cmd.run(client, message, args);
});

fs.readdir('./cmds/', (err, files) => {
    if (err) client.logger.error(err);
    client.logger.log(`${files.length} command will load.`)
    files.forEach(f => {
        let cmd = require(`./cmds/${f}`);
        client.logger.log(`${cmd.help.name} named command loaded.`)
        client.commands.set(cmd.help.name, cmd);
    });
});

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./gw.json",
  updateCountdownEvery: 3000,
  default: {
      botsCanWin: false,
      embedColor: 'GREYPLE',
      embedColorEnd: 'GREYPLE',
      reaction: '🎉'
    }
});

client.login("OTA2MjY4MjUxNzUzOTQ3MTQ2.YYWKFA.sMnFmRp2kuoRfba1SZmVS9iCqV4");
