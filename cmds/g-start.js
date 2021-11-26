const Discord = require("discord.js")
const ms = require("ms");

module.exports.help = {
  name: "gstart"
};

module.exports.run = async (client, message, args) => {  
 if(!message.guild) return message.channel.send(":boom: This command cannot be used in Direct Messages!");
  let prefix = "?";
  if (!message.member.permissions.has("MANAGE_MESSAGES") && !message.member.roles.cache.some(r => r.name === "Giveaways")) return message.channel.send(':boom: You must have the Manage Server permission, or a role called "Giveaways", to use this command!');



    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(
":boom: Please include a length of time, and optionally a number of winners and a prize!\nExample usage: `"+prefix+"gstart 30m 5 Awesome T-Shirt`");
    }

    // Number of winners
    let giveawayNumberWinners = args[1];
    // If the specified number of winners is not a number
    if(!giveawayNumberWinners || isNaN(giveawayNumberWinners)) { return message.channel.send(
":boom: Please include a length of time, and optionally a number of winners and a prize!\nExample usage: `"+prefix+"gstart 30m 5 Awesome T-Shirt`") };

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(
":boom: Please include a length of time, and optionally a number of winners and a prize!\nExample usage: `"+prefix+"gstart 30m 5 Awesome T-Shirt`");
    }

   let ss = "Congratulations {winners}! You won the **{prize}**!";
    client.giveawaysManager.start(message.channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: require("../conf.js").hostedBy ? message.author : null,
        messages: {
            giveaway: (require("../conf.js").everyoneMention ? "@everyone\n\n" : "")+":tada:  **GIVEAWAY**  :tada:",
            giveawayEnded: (require("../conf.js").everyoneMention ? "@everyone\n\n" : "")+":tada:  **GIVEAWAY ENDED**  :tada:",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with :tada: to enter!",
            winMessage: ss,
            noWinner: "Not enough entrants to determine a winner!",
            embedFooter: "Ends at",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });
  client.db.push('gws', { gwid: message.id, user: message.author.id });
  message.delete();

};