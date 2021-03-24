const { Client, MessageEmbed, Collection } = require("discord.js");
const client = new Client();
const data = require("wio.db");
const { Database } = require('wio.db');
const kdb = new Database("isimler");
const krank = new Database("kayıtrank");
const fs = require("fs");
require("./util/widLoader.js")(client);
const moment = require("moment");
const config = require("./ayarlar/register.json");
const { TOKEN, OWNER, GUILD_ID, VOICE_CHANNEL, ACTIVITY } = require("./ayarlar/client.json");
client.on("ready", async function() {
  let sanane = client.guilds.cache.get(GUILD_ID).channels.cache.find(r => r.name === VOICE_CHANNEL);
let widkanalXD = client.channels.cache.get(sanane.id);
if (widkanalXD) widkanalXD.join().catch(err => console.error(`Bot ses kanalına bağlanamadı :( `));
console.log(`Bot ${widkanalXD.name} adlı kanala başarıyla bağlandı :) `);
client.user.setPresence({ activity: { name: ACTIVITY }, status: "idle" })
console.log(`${client.user.tag} adlı botunuz artık online iyi kayıtlar :)`);
});
    const log = message => {
      console.log(`${message}`);
    };
    
    client.commands = new Collection();
    client.aliases = new Collection();
    fs.readdir("./widregister/", (err, files) => {
      if (err) console.error(err);
      log(`${files.length} komut yüklenecek.`);
      files.forEach(f => {
        let props = require(`./widregister/${f}`);
      console.log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
    
    client.reload = command => {
      return new Promise((resolve, reject) => {
        try {
          delete require.cache[require.resolve(`./widregister/${command}`)];
          let cmd = require(`./widregister/${command}`);
          client.commands.delete(command);
          client.aliases.forEach((cmd, alias) => {
            if (cmd === command) client.aliases.delete(alias);
          });
          client.commands.set(command, cmd);
          cmd.conf.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name);
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    };
    
    client.load = command => {
      return new Promise((resolve, reject) => {
        try {
          let cmd = require(`./widregister/${command}`);
          client.commands.set(command, cmd);
          cmd.conf.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name);
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    };
    
    client.unload = command => {
      return new Promise((resolve, reject) => {
        try {
          delete require.cache[require.resolve(`./widregister/${command}`)];
          let cmd = require(`./widregister/${command}`);
          client.commands.delete(command);
          client.aliases.forEach((cmd, alias) => {
            if (cmd === command) client.aliases.delete(alias);
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    };
    client.elevation = message => {
      if (!message.guild) {
        return;
      }
      let permlvl = 0;
      if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
      if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
      if (message.author.id === OWNER) permlvl = 4;
      return permlvl;
    };
client.login(TOKEN).catch(err => console.error("Discord API Tokeni Tanımlayamadı!"));
/////////////////////////////////////////////////////////////////////////////////////////
//--Hoşgeldin Mesaj Yeri--//
client.on("guildMemberAdd", async member => {
if (member.user.bot) return;
let kanal = member.guild.channels.cache.get(config.register_channel);
let zaman = new Date().getTime() - member.user.createdAt.getTime();
if (zaman < 1000*60*60*24*7) {
kanal.send(`${client.emojis.cache.get(config.no)} **${member} hesabi yeni olduğu için karantinaya gönderildi!**`);
member.roles.set([config.karantina_role]);
} else {
member.roles.set([config.unregister_roles])
let Gun = moment(member.user.createdAt).format("DD");
let Tarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
let Ay = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 
kanal.send(`
\`>\` ${member} adlı üye sunucumuza giriş yaptı, seninle toplam \`${member.guild.memberCount}\` kişiyiz!
\`>\` <@&${config.register_staff}> rolündeki yetkililer seninle ilgilenecektir.
\`>\` Sunucumuza kayıt olmak için sese girip teyit vermen gerekmektedir.
\`>\` Hesabın Oluşturulma Tarihi: ${Gun} ${Ay} ${Tarih}
`);}});
///////////////////////////////////////////////////////////////////////////////////////////
//--Tag yazınca tagı atma--//
client.on('message', widtag => {
if (widtag.content.toLowerCase() === 'tag') {
widtag.delete()
widtag.channel.send(`\`${config.tag}\``).then(tagmsg => tagmsg.delete({ timeout: 15000, reason: 'mesaj silme' }));
}});
///////////////////////////////////////////////////////////////////////////////////////////
//--oto isim--//
client.on("guildMemberAdd", widMember => {
if (widMember.user.bot) return;
if (widMember.user.username.includes(config.tag)) {
widMember.setNickname(`${config.tag} İsim | Yaş`)
} else if (!widMember.user.username.includes(config.tag)) {
widMember.setNickname(`${config.untag} İsim | Yaş`)
}})
//////////////////////////////////////////////////////////////////////////////////////////
//--Tag Alana Rol Verme--//
client.on("userUpdate", async (oldWid, newWid) => { 
let tagkanal = client.guilds.cache.get(GUILD_ID).channels.cache.get(config.tag_log);
if (oldWid.username !== newWid.username) {
if (newWid.username.includes(config.tag) && !client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).roles.cache.has(config.tag_role)) 
{
await client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).roles.add(config.tag_role);
await client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).setNickname(client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).displayName.replace(config.untag, config.tag));  
tagkanal.send(`${client.emojis.cache.get(config.yes)} ${newWid} **adlı kullanıcı \`${config.tag}\` sembolünü kullanıcı adına ekleyerek ekibimize katıldı.**`);
}
if (!newWid.username.includes(config.tag) && client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).roles.cache.has(config.tag_role)) 
{
let taglıalım = data.get(`widTaglı.${GUILD_ID}`);  
if (taglıalım == "Aktif") {		
let widmember = client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id);
if (!widmember) return;
await client.guilds.cache.get(GUILD_ID).members.cache.get(widmember.id).roles.remove(config.tag_role);
await widmember.roles.cache.has(config.booster_role) ? widmember.roles.set([config.booster_role,  config.unregister_roles]) : widmember.roles.set([config.unregister_roles]); 
}		
await client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).roles.remove(config.tag_role);
await client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).setNickname(client.guilds.cache.get(GUILD_ID).members.cache.get(newWid.id).displayName.replace(config.tag, config.untag));
tagkanal.send(`${client.emojis.cache.get(config.no)} ${newWid} **adlı kullanıcı \`${config.tag}\` sembolünü kullanıcı adından kaldırarak ekibimizden ayrıldı.**`);
}}});
///////////////////////////////////////////////////////////////////////////////////////
//--Bot Oto Rol--//
client.on("guildMemberAdd", widMember => {
if (widMember.user.bot){
widMember.roles.add(config.BOT_OTO_ROL)
}})
///////////////////////////////////////////////////////////////////////////////////////

// Şimdidien İyi Kullanımlar.
// Discord : https://discord.gg/h78bpwRQ4P
// Tamamı Bana Ait Değildir.
