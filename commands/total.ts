module.exports = {
  name: "total",
  execute(msg) {
    msg.reply(
      `${msg.client.guilds.cache
        .map((g) => g.memberCount)
        .reduce((a, c) => a + c)}`
    );
  },
};
