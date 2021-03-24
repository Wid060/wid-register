const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.booster_role)) {
message.react(config.no);
return;};
let nick = args[0];
if(!args[0]) return message.channel.send("**Yeni adını belirt!**")

message.author.setNickname(nick);
message.channel.send(`**${message.author} yeni adın \`${nick}\` olarak değiştirildi!**`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'booster',
  description: '',
  usage: ''
}; 
