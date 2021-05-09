const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { PREFIX } = require("../ayarlar/client.json");

exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.nick_staff) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(config.no);
return;};
let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!widmember) {
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Kişi Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;};
if (message.member.roles.highest.position <= widmember.roles.highest.position) return message.channel.send(`${client.emojis.cache.get(config.no)} ${widmember} **senden üstün veya aynı rolde!**`).then(x => x.delete({ timeout: 5000 }));         
args = args.filter(a => a !== "" && a !== " ").splice(1);
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || "00";
let nick = `${widmember.user.username.includes(config.tag) ? config.tag : (config.untag ? config.untag : (config.tag || ""))} ${isim} | ${yaş}`

if(!isim || !yaş) {
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **İsim Yaş Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;    
};
let taglıalım = krank.fetch(`widTaglı.${message.guild.id}`);  
if (taglıalım == "Aktif") {		
if(!widmember.user.username.includes(config.tag) && !widmember.roles.cache.has(config.vip_role) && !widmember.roles.cache.has(config.booster_role)) 
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Taglı alımdayız!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;
}
widmember.setNickname(nick);
message.channel.send(`**${widmember} yeni adı \`${nick}\` olarak değiştirildi!**`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nick","name"],
  permLevel: 0
};

exports.help = {
  name: 'isim',
  description: '',
  usage: ''
}; 
