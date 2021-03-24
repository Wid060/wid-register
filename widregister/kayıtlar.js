const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const data = require('wio.db');
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
    var sayi = 1
    let wida = kdb.get(`Widİsim.${message.guild.id}`)
    if(!wida) return message.channel.send(`${client.emojis.cache.get(config.no)} **Veri Yok!**`).then(msg => msg.delete({ timeout: 7000, reason: 'mesaj silme' }));
    let kayıtlar = wida.filter(x => x.widuye === widmember.id).map(nix => `${sayi++}- \`• ${nix.isim}\`  [<@&${nix.role}> || <@&${nix.role2}>]\nTarih : ${nix.Tarih}`).join("\n")
    if(kayıtlar === null) kayıtlar = "Kayıt Yok"
    if(kayıtlar === undefined) kayıtlar = "Kayıt Yok"
  const embed = new MessageEmbed()
    .setAuthor(`${widmember.user.tag} ${sayi-1} Eski Kayıtları`) 
    .setDescription(`
    ${kayıtlar}`)
    .setTimestamp()
    .setColor(0x2f3136)
    .setFooter("💖 Wid Beycik",message.author.avatarURL({dynamic: true}));
  message.channel.send(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isimler"],
  permLevel: 0
};

exports.help = {
  name: 'kayıtlar',
  description: '',
  usage: ''
}; 
