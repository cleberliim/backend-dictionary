const redis = require('../config/redis');

exports.cache = (req, res, next) => {
    const { search = '', limit = 10, page = 1 } = req.query;
    redis.get(`words:${search}:${limit}:${page}`, (err, result) => {
        if (result) {
            return res.status(200).json(JSON.parse(result));
        }
        next();
    });
};
