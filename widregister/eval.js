const Discord = require('discord.js')
exports.run = (client,message,args) => {
    let code = args.join(" ");
    let result;
    try {
        result = eval(code);
    } catch (error) {
        result = error;
    }
  
    message.channel.send(result, {
        code: true,
        split: true
    });
     
  
   
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'eval',
  description: '',
  usage: ''
}; 