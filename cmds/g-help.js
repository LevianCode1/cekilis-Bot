module.exports.help = {
  name: "ghelp"
};

module.exports.run = async (client, message, args) => {
  let prefix = "?";
  message.react('🎉');
  message.channel.send(`:tada: __**`+client.user.username+`** komutlari:__\n\n**${prefix}gabout** - bot hakkında bilgi gösterir\n**${prefix}ginvite** - botun nasıl davet edileceğini gösterir\n**${prefix}gping** - botun gecikmesini kontrol eder\n\n__Çekiliş:__\n\n**${prefix}gstart <süre> [kazanan] [ödül]** - bir eşantiyon başlatır (hızlı kurulum)\n**${prefix}gend [messageId]** - mevcut kanalda belirtilen veya en son çekilişi bitirir (bir kazanan seçer)\n**${prefix}greroll [messageId]** - mevcut kanalda belirtilen veya en son çekilişi yeniden yayınlar\n**${prefix}glist** - sunucudaki etkin çekilişleri listeler\n\n"<>", "<>" veya "[]" isteğe bağlı anlamına gelir.`)
};