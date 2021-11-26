const ms = require('ms');
const Discord = require('discord.js');

module.exports.help = {
  name: "greroll"
};

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.channel.send(":boom: This command cannot be used in Direct Messages!");
  let prefix = "?";
  if (!message.member.permissions.has("MANAGE_MESSAGES") && !message.member.roles.cache.some(r => r.name === "Giveaways")) return message.channel.send(':boom: You must have the Manage Server permission, or a role called "Giveaways", to use this command!');
let messageID = args[0];
    if(!messageID){
        return message.channel.send(':boom: Please specify an de-active giveaway ID!');
    }
client.giveawaysManager.reroll(messageID, {
    messages: {
        congrat: ":tada:The new winner(s) is {winners}! Congralutions!",
        error: "I couldn't determine a winner for that giveaway!"
                    }   
}).catch((err) => {
    message.channel.send(":boom: There is no such giveaway on the server!");
})
}