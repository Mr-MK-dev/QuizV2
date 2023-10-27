const asyncHandler = require('express-async-handler');

exports.read = (Model) =>
    asyncHandler(async (req, res) => {
        const query = req.query;

        const data = await Model.find(query);
        res.json({
            data,
        });
    });

exports.delete = (Model) =>
    asyncHandler(async (req, res) => {
        const _id = req.params.id;
        const data = await Model.findByIdAndDelete(_id);
        res.json({
            data,
        });
    });
