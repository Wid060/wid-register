const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { PREFIX } = require("../ayarlar/client.json");
const moment = require("moment");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.staff_role) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(config.no);
return;};
let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!widmember) {
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Kişi Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;};
widmember.roles.add(config.vip_role)
message.channel.send(`${client.emojis.cache.get(config.yes)} ${widmember} **Başarıyla <@&{config.vip_role}> rolü verildi!**`)
message.react(config.yes);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["special"],
  permLevel: 0
};

exports.help = {
  name: 'vip',
  description: '',
  usage: ''
}; 
