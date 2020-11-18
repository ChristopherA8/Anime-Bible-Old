const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.ts', { token: 'redacted' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();