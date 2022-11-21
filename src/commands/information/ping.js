const { EmbedBuilder, Client, Message } = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ["p"],
    description: "test command",
    userPermissions: ['SendMessages'],
    botPermissions: ['ViewChannel'],
    // ownerOnly: true, -> Optional
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setDescription(`🏓 ${client.ws.ping}ms!`)
            .setColor('Green')
        message.reply({
            embeds: [embed]
        })
    }
}