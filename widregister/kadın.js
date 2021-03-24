const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { PREFIX } = require("../ayarlar/client.json");
const data = require("wio.db");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
exports.run = (client,message,args) => {
if (!message.member.roles.cache.has(config.staff_role) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(no);
return;};
let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!widmember) {
message.react(no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Kişi Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;};
if (message.member.roles.highest.position <= widmember.roles.highest.position) return message.channel.send(`${client.emojis.cache.get(config.no)} ${member} **senden üstün veya aynı rolde!**`).then(x => x.delete({ timeout: 5000 }));        
if (message.member.id === widmember.id) return message.channel.send(`${client.emojis.cache.get(config.no)} ${member} **kendini kayıt edemessin!**`).then(x => x.delete({ timeout: 5000 }));
if (!widmember.roles.cache.some(widbay => [config.man_role, config.man_role2].includes(widbay.id)) && !widmember.roles.cache.some(widbayan => [config.woman_role, config.woman_role2].includes(widbayan.id))) return message.channel.send(`${client.emojis.cache.get(config.no)} **Bu kişi zaten kayıtlı!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));  
args = args.filter(a => a !== "" && a !== " ").splice(1);
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || "00";
let nick = `${widmember.user.username.includes(config.tag) ? config.tag : (config.untag ? config.untag : (config.tag || ""))} ${isim} | ${yaş}`

if(!isim || !yaş) {
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **İsim Yaş Belirt!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;    
};
let taglıalım = data.fetch(`widTaglı.${message.guild.id}`);  
if (taglıalım == "Aktif") {		
if(!widmember.user.username.includes(config.tag) && !widmember.roles.cache.has(config.vip_role) && !widmember.roles.cache.has(config.booster_role)) 
message.react(config.no);
message.channel.send(`${client.emojis.cache.get(config.no)} **Taglı alımdayız!**`).then(msg => msg.delete({ timeout: 5000, reason: 'mesaj silme' }));
return;
}
widmember.setNickname(nick);
let tarih = moment(message.createdAt).format("`(DD/MM/YYYY | HH:mm:ss)`");
kdb.push(`Widİsim.${message.guild.id}`, {
widuye: widmember.id,
isim: nick,
role: config.woman_role,
role2: config.woman_role2,
widyetkili: message.member.tag,
Tarih: tarih,
})
var sayi = 1
let wida = kdb.get(`Widİsim.${message.guild.id}`)
let kayıtlar = wida.filter(x => x.widuye === widmember.id).splice(0, 3).map(nix => `${sayi++}- \`• ${nix.isim}\`  [<@&${nix.role}> || <@&${nix.role2}>]\nTarih : ${nix.Tarih}`).join("\n")
if(kayıtlar === null) isimler = "Kayıt Yok"
if(kayıtlar === undefined) isimler = "Kayıt Yok"
widmember.roles.cache.has(config.booster_role) ? widmember.roles.set([config.booster_role,  config.woman_role, config.woman_role2]) : widmember.roles.set([config.woman_role, config.woman_role2]);
message.react(config.yes);
let regsterchnl = message.guild.channels.cache.get(config.register_channel);
regsterchnl.send(new MessageEmbed().setDescription(`${client.emojis.cache.get(config.yes)} ${hedefKişi} isimli üye başarıyla kayıt edildi.\n\n${kayıtlar}\n\nTüm kayıtlar için ${PREFIX}kayıtlar`).setColor(0x2f3136).setFooter("💖 Wid Beycik",message.author.avatarURL({dynamic: true})))
let kızTeyit = krank.fetch(`kızTeyit.${message.author.id}`) || "0"
let erkekTeyit = krank.fetch(`erkekTeyit.${message.author.id}`) || "0";
let topTeyit = krank.fetch(`topTeyit.${message.author.id}`) || "0";
const logwid = new MessageEmbed()
  .setAuthor(`${message.guild.name} Kayıt Sistemi`,message.guild.iconURL({dynamic: true}))
  .setTitle(`${message.author.tag} Kayıt işlemi yaptı`)
  .addField(`Kaydı Yapan`,`${message.author} (\`${message.author.id}\`)`,true)
  .addField(`Kaydı Yapılan`,`${widmember} (\`${widmember.id}\`)`,true)
  .addField(`Kayıt Kanalı`,`[${message.channel}]`,true)
  .addField(`İsmi`,`\`${isim} | ${yaş}\``,true)
  .addField(`Verilen Roller`,`[<@&${config.woman_role}> | <@&${config.woman_role2}>]`,true)
  .addField(`Alınan rol`,`(<@&${config.unregister_roles}>)`,true)
  .addField(`Kız kayıt sayısı`,`[\`${kızTeyit}\`]`,true)
  .addField(`Erkek kayıt sayısı`,`[\`${erkekTeyit}\`]`,true)
  .addField(`Toplam kayıt sayısı`,`[\`${topTeyit}\`]`,true)
  .setTimestamp()
  .setColor(0x2f3136)
  .setFooter("💖 Wid Beycik",message.author.avatarURL({dynamic: true}));
  let lgwid = message.guild.channels.cache.get(config.register_log);
  lgwid.send(logwid)
  krank.add(`kızTeyit.${message.author.id}`, 1);
  krank.add(`topTeyit.${message.author.id}`, 1);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "bayan","woman", "kadın"],
  permLevel: 0
};

exports.help = {
  name: 'kız',
  description: '',
  usage: ''
}; 
