const utils = require("../../../Base/utils.json");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = async (member) => {

  let logChannel = member.guild.channels.cache.get(utils["log-guildMemberLeave"]);
  if(!logChannel) return;

  const userName = member.user.username;
  const avatarURL = member.user.avatarURL({ size:4096, dynamic:true });
  const embed = new MessageEmbed()
  .setAuthor(userName, avatarURL)
  .setThumbnail(avatarURL)
  .setDescription(`**${userName}** sunucudan ayrıldı. Sunucumuz ${member.guild.memberCount} kişiye düştü!
  
  **Kullanıcı Bilgileri:**
  \`•\` Kullanıcı: ${member}
  \`•\` ID: \`${member.id}\`
  `);
  logChannel.send(logChannel, embed, false);

  fs.appendFile('./TEXT_DATABASE/MEMBER/guildMemberLeave.log', `
  ${userName} (${member.id}) sunucudan ayrıldı.
  ___________________________________
  `, 'utf8', (err) => {
      if (err) console.log(err);
  });

};

module.exports.conf = {
    name: "guildMemberLeave",
    e_name:"guildMemberLeave",
};