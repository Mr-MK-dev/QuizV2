exports.checkBody = (...params) => {
    var checkes = (req, res, next) => {
        for (var prop of params) {
            if (!req.body.hasOwnProperty(prop)) {
                res.json({
                    Error: `Missing ${prop}`,
                });
            }
        }
        next();
    };
    return checkes;
};
