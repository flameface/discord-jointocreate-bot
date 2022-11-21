const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = require('../../index');
const config = require('../../config/config.json');

module.exports = {
    name: "messageCreate"
};

client.on('messageCreate', async (message) => {
    let prefix = config.PREFIX;
    if (message.channel.type !== 0) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd))

    if (command) {
        if (command.ownerOnly) {
            if (!config.OWNER.includes(message.member.id)) {
                message.reply({
                    content: `**${message.member}** You can't access owner commands`,
                })
                return false;
            }
        }

        if (command.userPermissions) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPermissions || []))) return message.reply({
                content: `${message.member} You don't have the required permissions to use this command -> \`${command.userPermissions || []}\``,
            })
            return false;
        }

        if (command.botPermissions) {
            if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPermissions || []))) return message.reply({
                content: `${message.member} I don't have the required permissions to use this command -> \`${command.botPermissions || []}\``
            })
            return false;
        }

        try {
            command.run(client, message, args);
        } catch (err) {
            console.log(err);
        }
    }
})
