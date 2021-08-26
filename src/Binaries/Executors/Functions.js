const { Guild, GuildMember, TextChannel , MessageEmbed } = require("discord.js");
const { developers } = require("../../Base/config");
module.exports = async (client) => {
    
  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
        } catch (err) {
          return undefined;
    };
};

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.fetchBan(userID);
        } catch (err) {
          return undefined;
    };
};

  client.üye = async (search, guild) => {
    let member = null;
    if (!search || typeof search !== "string") return;
    if (search.match(/^<@!?(\d+)>$/)) {
      let id = search.match(/^<@!?(\d+)>$/)[1];
      member = await guild.members.fetch(id).catch(() => { });
      if (member) return member;
};
    if (search.match(/^!?([^#]+)#(\d+)$/)) {
      guild = await guild.fetch();
      member = guild.members.cache.find(m => m.user.tag === search);
      if (member) return member;
};
    member = await guild.members.fetch(search).catch(() => { });
    return member;
};

  client.timeTR = function (value) {
    const days = Math.floor(value / 86400000);
    value = value % 86400000;
    const hours = Math.floor(value / 3600000);
    value = value % 3600000;
    const minutes = Math.floor(value / 60000);
    value = value % 60000;
    const seconds = Math.floor(value / 1000);
      return (days ? days + ' gün ' : '') + (hours ? hours + ' saat ' : '') + (minutes ? minutes + ' dakika ' : '') + (seconds ? seconds + ' saniye' : '');
};

client.sendEmbed = async function (channel,content,deleted = false, user, timeout = 10000) {
  let embed ;
  if(content instanceof MessageEmbed) embed = content;
  else embed = new MessageEmbed()
  .setAuthor(user.username,user.displayAvatarURL({ size:4096, dynamic:true }))
  .setDescription(content);
  embed.setColor("WHITE")
  embed.setTimestamp()
  embed.setFooter("Developed by Jyross.")
  const sended = await channel.send(embed);
  if(deleted) sended.delete({ timeout });
  return sended;
};

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};
      
  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
      const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
        return this.roles.set(newRoles).catch(() => {});
};

  GuildMember.prototype.check = function (array) {
    if (developers.includes(this.id) || this.guild.ownerID === this.id || this.hasPermission("ADMINISTRATOR") || (array && array.length && array.some((id) => this.roles.cache.has(id) || this.id === id))) return true;
      else return false;
};

};