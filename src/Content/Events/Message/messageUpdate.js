const utils = require("../../../Base/utils.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const fs = require("fs");

module.exports = async (oldMessage,newMessage) => {

    if(!oldMessage.author) return;
    if(oldMessage.author.bot) return;
    if(oldMessage.content === newMessage.content) return;

    let logChannel = newMessage.guild.channels.cache.get(utils["log-messageUpdate"]);
    if(!logChannel) return;
    
    const { client } = newMessage;

    const embed = new MessageEmbed()
    .setAuthor(`Mesaj sahibi: ${oldMessage.author.username}`, oldMessage.author.avatarURL({ size:4096, dynamic:true }))
    .setFooter(`Mesaj ID: ${newMessage.id}`)
    .setDescription(`**${oldMessage.author} kişisinin ${oldMessage.channel} kanalındaki mesajı düzenlendi.**
    
    \`•\` Eski mesaj: ${oldMessage.content}
    \`•\` Yeni mesaj: ${newMessage.content}
    \`•\` Mesajın oluşturulma tarihi: \`${moment(oldMessage.createdAt).format("LLL")}\`
    \`•\` Mesajın güncellenme tarihi: \`${moment(Date.now()).format("LLL")}\`
    `)
    client.sendEmbed(logChannel,embed,false)

fs.appendFile('./TEXT_DATABASE/MESSAGE/messageUpdate.log', `
${oldMessage.author} kişisinin ${oldMessage.channel} kanalındaki mesajı düzenlendi.
Eski mesaj: ${oldMessage.content} - Yeni mesaj: ${newMessage.content} - oluşturulma tarihi: ${moment(oldMessage.createdAt).format("LLL")} - güncellenme tarihi: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
  if (err) console.log(err);
});

};

module.exports.conf = {
    name:"messageUpdate",
    e_name:"messageUpdate",
};