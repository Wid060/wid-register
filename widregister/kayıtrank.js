const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.register_staff) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(config.no);
return;};
let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x2f3136).setFooter("💖 Wid Beycik",message.author.avatarURL({dynamic: true})).setTimestamp();
let kızTeyit = krank.fetch(`kızTeyit.${widmember.id}`) || "0"
let erkekTeyit = krank.fetch(`erkekTeyit.${widmember.id}`) || "0";
let topTeyit = krank.fetch(`topTeyit.${widmember.id}`) || "0";
const teyitrank = `
Kız    :: ${kızTeyit}
Erkek  :: ${erkekTeyit}
Toplam :: ${topTeyit}`;

message.channel.send(embed.setDescription(`
${widmember} isimli kullanıcının teyit rank bilgileri:
    
\`\`\`asciidoc\n${teyitrank}\`\`\``)) 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyitrank","teyit"],
  permLevel: 0
};

exports.help = {
  name: 'kayıtrank',
  description: '',
  usage: ''
}; 
