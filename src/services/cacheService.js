const redis = require("redis");
const redisClient = require("../config/redisClient");

const cacheService = {
  async getFromCache(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data ? JSON.parse(data) : null);
        }
      });
    });
  },

  async saveToCache(key, data, ttl = 3600) {
    return new Promise((resolve, reject) => {
      redisClient.setex(key, ttl, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
};

module.exports = cacheService;
