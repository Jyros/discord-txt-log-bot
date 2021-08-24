const utils = require("../../../Base/utils.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const fs = require("fs");

module.exports = async (message) => {

    if(!message.author) return;
    if(message.author.id === message.client.user.id) return;

    let logChannel = message.guild.channels.cache.get(utils["log-messageDelete"]);
    if(!logChannel) return;

    const { client } = message;

    const embed = new MessageEmbed()
    .setAuthor(`Mesaj sahibi: ${message.author.username}`, message.author.avatarURL({ size:4096, dynamic:true }))
    .setFooter(`Mesaj ID: ${message.id}`)
    .setDescription(`${message.author} kişisinin ${message.channel} kanalındaki mesajı silindi.
    
    \`•\` Mesaj içeriği: **${message.content}**
    \`•\` Mesajın oluşturulma tarihi: \`${moment(message.createdAt).format("LLL")}\`
    \`•\` Mesajın silinme tarihi: \`${moment(Date.now()).format("LLL")}\`
    `);
    client.sendEmbed(logChannel,embed,false)

fs.appendFile('./TEXT_DATABASE/MESSAGE/messageDelete.log', `
${message.author} kişisinin ${message.channel} kanalındaki mesajı silindi.
Mesaj; içeriği: ${message.content} - oluşturulma tarihi: ${moment(message.createdAt).format("LLL")} - silinme tarihi: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
    if (err) console.log(err);
});

};

module.exports.conf = {
    name:"messageDelete",
    e_name:"messageDelete",
};