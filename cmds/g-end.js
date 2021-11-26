const ms = require('ms');
const Discord = require('discord.js');

module.exports.help = {
  name: "gend"
};

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.channel.send(":boom: This command cannot be used in Direct Messages!");
  let prefix = "?";
  if (!message.member.permissions.has("MANAGE_MESSAGES") && !message.member.roles.cache.some(r => r.name === "Giveaways")) return message.channel.send(':boom: You must have the Manage Server permission, or a role called "Giveaways", to use this command!');
    if(!args[0]){
        return message.channel.send(':boom: Please specify an active giveaway name or ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send(':boom: There is no such giveaway on the server!');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    }).then(() => {
        message.channel.send(':boom: This giveaways is ending...').then(a => a.delete({timeout: 100}));
    })
    .catch((e) => {
        if(e.startsWith(`:boom: I couldn't determine a winner for that giveaway.!`)){
            message.channel.send(':boom: I couldn\'t determine a winner for that giveaway!');
        } else {
            console.error(e);
            message.channel.send(':boom: Something went wrong!');
        }
    });

};