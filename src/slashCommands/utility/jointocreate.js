const { ApplicationCommandOptionType, Client, CommandInteraction } = require("discord.js");
const schema = require("../../database/models/join-to-create")

module.exports = {
    name: "jointocreate",
    description: "setup join to create channel",
    userPermissions: ["ManageGuild", "Connect"],
    botPermissions: ["ManageGuild", "ManageChannels"],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const channel = interaction.member.voice.channelId
        if (!channel) return interaction.reply(`**${interaction.member}** Join the voice channel you wanna convert to **join to create** vc`);

        let data = await schema.findOne({ Guild: interaction.guild.id })
        if (!data) {
            data = new schema({
                Guild: interaction.guild.id,
                Channel: channel
            }).save()
        } else {
            data.Channel = channel
            data.save()
        }

        interaction.reply({
            content: `<#${channel}> has been set as join to create vc`
        })
    }
}