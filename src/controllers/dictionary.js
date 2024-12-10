const Word = require('../models/Word');
const redis = require('../config/redis');

exports.getWords = (req, res) => {
    const { search = '', limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    redis.get(`words:${search}:${limit}:${page}`, (err, result) => {
        if (result) {
            return res.status(200).json(JSON.parse(result));
        }

        Word.findAll(search, limit, offset, (err, words) => {
            if (err) return res.status(500).json({ message: 'Error fetching words' });

            const totalDocs = words.length;
            const totalPages = Math.ceil(totalDocs / limit);
            const response = {
                results: words.map(word => word.word),
                totalDocs,
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            };

            redis.setex(`words:${search}:${limit}:${page}`, 3600, JSON.stringify(response));

            res.status(200).json(response);
        });
    });
};
