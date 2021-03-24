const { MessageEmbed } = require('discord.js')
const config = require("../ayarlar/register.json");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
exports.run = (client,message,args) => {
let taglıalım = krank.fetch(`widTaglı.${message.guild.id}`)
    if(!args[0]) {
    message.channel.send(`${client.emojis.cache.get(config.yes)} **Taglı alım sistemini aktif etmek için "taglıalım aktif" kapatmak için "taglıalım deaktif" yazmalısın!**`).then(msg => msg.delete({ timeout: 7000, reason: 'mesaj silme' }));
    message.react(config.no);
    return;    
    }
        if (args[0] === "aktif") {
        if(taglıalım == "Aktif") return message.channel.send(`${client.emojis.cache.get(config.no)} **Taglı alım sistemi zaten aktif!**`).then(msg => msg.delete({ timeout: 4000, reason: 'mesaj silme' }));
        krank.set(`widTaglı.${message.guild.id}`, "Aktif")
        message.channel.send(`${client.emojis.cache.get(config.yes)} **Taglı alım sistemi aktif edildi!**`).then(msg => msg.delete({ timeout: 4000, reason: 'mesaj silme' }));
        return;    
        } else if (args[0] === "deaktif") {
            if(taglıalım == "Deaktif") return message.channel.send(`${client.emojis.cache.get(config.no)} **Taglı alım sistemi zaten deaktif!**`).then(msg => msg.delete({ timeout: 4000, reason: 'mesaj silme' }));
        krank.set(`widTaglı.${message.guild.id}`, "Deaktif")
        message.channel.send(`${client.emojis.cache.get(config.yes)} **Taglı alım sistemi kapatıldı!**`).then(msg => msg.delete({ timeout: 4000, reason: 'mesaj silme' }));
        return;    
        };
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["taglı-alım"],
  permLevel: 4
};

exports.help = {
  name: 'taglıalım',
  description: '',
  usage: ''
};
