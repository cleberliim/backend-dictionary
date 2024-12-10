const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => {
  console.log("Erro no Redis: ", err);
});

module.exports = redisClient;
