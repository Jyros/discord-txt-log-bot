const utils = require("../../../Base/utils.json");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = async (member) => {

  let logChannel = member.guild.channels.cache.get(utils["log-guildMemberAdd"]);
  if(!logChannel) return;
  
  const { client } = member;  
  const userName = member.user.username;
  const avatarURL = member.user.avatarURL({ size:4096, dynamic:true });
  const embed = new MessageEmbed()
  .setAuthor(userName, avatarURL)
  .setThumbnail(avatarURL)
  .setDescription(`**${userName}** sunucuya katıldı. Sunucumuz ${member.guild.memberCount} adet kullanıcıya ulaştı!
  
  **Kullanıcı Bilgileri:**
  \`•\` Kullanıcı: ${member}
  \`•\` ID: \`${member.id}\`
`);
  client.sendEmbed(logChannel, embed, false);

  fs.appendFile('./TEXT_DATABASE/MEMBER/guildMemberAdd.log', `
  ${userName} (${member.id}) sunucuya katıldı.
  ___________________________________
  `, 'utf8', (err) => {
      if (err) console.log(err);
  });

};

module.exports.conf = {
    name: "guildMemberAdd",
    e_name:"guildMemberAdd",
};