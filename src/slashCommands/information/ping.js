module.exports = {
    name: "ping",
    description: "Sends client latency ping",
    run: async (client, interaction, args) => {
        interaction.reply({
            content: `Ping: ${Math.round(client.ws.ping)}ms`
        });
    }
}