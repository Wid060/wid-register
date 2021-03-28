const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { PREFIX } = require("../ayarlar/client.json");
const moment = require("moment");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.register_staff) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(config.no);
return;};
let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!widmember) {
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Kişi Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;};
widmember.roles.cache.has(config.booster_role) ? widmember.roles.set([config.booster_role, config.unregister_roles]) : widmember.roles.set([config.unregister_roles]); 
message.react(config.yes);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unregister"],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsız',
  description: '',
  usage: ''
}; 
