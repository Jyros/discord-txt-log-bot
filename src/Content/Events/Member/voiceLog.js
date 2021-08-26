const { MessageEmbed } = require("discord.js");
const utils = require("../../../Base/utils.json");
const moment = require("moment");
moment.locale("tr");
const fs = require("fs");

module.exports = async (oldState, newState) => {

let embed = new MessageEmbed().setTimestamp()
const channel = newState.guild.channels.cache.get(utils["log-voice"]);
if (!channel) return;

if (!oldState.channel && newState.channel) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalına girdi!`).setFooter(`Girdiği Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalına girdi.
Girdiği saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel && !newState.channel) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`).setFooter(`Ayrıldığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!
Ayrıldığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) { 
    channel.send(embed.setDescription(`${newState.member.displayName} adlı kullanıcı \`${oldState.channel.name}\` adlı ses kanalından çıkıp \`${newState.channel.name}\` adlı ses kanalına girdi.`).setFooter(`Girdiği Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} adlı kullanıcı \`${oldState.channel.name}\` adlı ses kanalından çıkıp \`${newState.channel.name}\` adlı ses kanalına girdi.
Girdiği saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && oldState.selfMute && !newState.selfMute) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`).setFooter(`Susturmasını Kaldırdığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!
Susturulmasını kaldırdığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && !oldState.selfMute && newState.selfMute) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`).setFooter(`Susturduğu Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!
Susturduğu saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`).setFooter(`Sağırlaştırmasını Kaldırdığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!
Sağırlaştırmasını kaldırdığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`).setFooter(`Sağırlaştığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!
Sağırlaştığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`).setFooter(`Yayın Açtığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!
Yayın açtığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`).setFooter(`Yayını Kapattığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!
Yayını kapattığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`).setFooter(`Kamerasını Açtığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!
Kamerasını açtığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) { 
    channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`).setFooter(`Kamerasını Kapattığı Saat`));
fs.appendFile('./TEXT_DATABASE/MEMBER/voiceLog.log', `
${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!
Kamerasını kapattığı saat: ${moment(Date.now()).format("LLL")}
___________________________________
`, 'utf8', (err) => {
        if (err) console.log(err);
    });
};

};

module.exports.conf = {
    name: "voiceStateUpdate",
    e_name:"voiceStateUpdate",
};