module.exports.help = {
  name: "glist"
};

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.channel.send(":boom: This command cannot be used in Direct Messages!");
  let activeGiveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id);
  let giveaways = activeGiveaways.filter((g) => !g.ended);
  if (!message.member.permissions.has("MANAGE_MESSAGES") && !message.member.roles.cache.some(r => r.name === "Giveaways")) return message.channel.send(':boom: You must have the Manage Server permission, or a role called "Giveaways", to use this command!');
  if(giveaways.length == 0) return message.channel.send(':boom: There are no giveaways running on the server!');
  message.channel.send(`:tada: __Active Giveaways on **${message.guild.name}**__:\n\n${giveaways.map((g) => `\`${g.messageID}\` | <#${g.channelID}> | **${g.data.winnerCount}** winner(s) | Prize: **${g.data.prize}**`).join("\n")}`)
};