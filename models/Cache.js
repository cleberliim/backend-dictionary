const mongoose = require("mongoose");

const CacheSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

// Definir TTL (Time-To-Live) de 1 hora
CacheSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 3600 });

const Cache = mongoose.model("Cache", CacheSchema);
module.exports = Cache;
