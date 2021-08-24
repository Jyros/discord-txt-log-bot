const utils = require("../../../Base/utils.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const fs = require("fs");

module.exports = async (channel) => {

    let logChannel = channel.guild.channels.cache.get(utils["log-channelDelete"]);
    if(!logChannel) return;
  
  const { client } = channel;
  const type = {
    voice:"Ses",
    text:"Yazışma",
    category:"Kategori"
  };
  const fetchLogs = await channel.guild.fetchAuditLogs({ 
    limit:1, 
    type:"CHANNEL_DELETE" 
  });

  const auditEntry = fetchLogs.entries.first();
  const executor = auditEntry ? auditEntry.executor.username : "Bulunamadı."
  const avatarURL = auditEntry ? auditEntry.executor.avatarURL({ size:4096, dynamic:true }) : null; 
  const embed = new MessageEmbed()
  .setAuthor(`${executor} kişisi bir kanal sildi!`, avatarURL)
  .setDescription(`
  **Kullanıcı Bilgileri:**
  \`•\` Kullanıcı: ${auditEntry.executor}
  \`•\` ID: \`${auditEntry.executor.id}\`
  
  **Kanal Bilgileri:**
  \`•\` Kanal ismi: \`${channel.name}\`
  \`•\` Kanal tipi: \`${type[channel.type]}\`
  \`•\` Kategori: **${channel.parent ? channel.parent : "Bulunmuyor."}**
  \`•\` Oluşturulma zamanı: \`${moment(channel.createdAt).format("LLL")}\`
  \`•\` Silinme zamanı: \`${moment(Date.now()).format("LLL")}\`
`);
  client.sendEmbed(logChannel,embed,false);

  fs.appendFile('./TEXT_DATABASE/CHANNEL/channelDelete.log', `
  ${executor} (${auditEntry.executor.id}) kişisi bir kanal sildi.
  • Kanal; ismi: ${channel.name} (${channel.id}) - tipi: ${type[channel.type]} - kategorisi: ${channel.parent ? channel.parent : "Bulunmuyor."}
  • Oluşturulma zamanı: ${moment(channel.createdAt).format("LLL")} - Silinme zamanı: ${moment(Date.now()).format("LLL")}
  ___________________________________
  `, 'utf8', (err) => {
      if (err) console.log(err);
  });

};

module.exports.conf = {
    name: "channelDelete",
    e_name:"channelDelete",
};