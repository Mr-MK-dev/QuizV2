const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
exports.getallArchive = async (req, res) => {
    const createdBy = req.tokenValue._id;
    const allArchives = await Quiz.find({ createdBy, status: 'draft' });
    res.json({
        msg: allArchives,
    });
};

exports.editArchive = async (req, res) => {
    try {
        const createdAt = Date.now();
        const quizId = req.params.id;
        const quiz = await Archive.findOneAndUpdate(
            { _id: quizId },
            { status: 'publish' }
        );
        await Quiz.create(quiz).then(async () => {
            await Archive.findByIdAndDelete({
                _id: quizId,
            });
        });

        res.json({
            msg: 'Quiz moved to publish area ',
        });
    } catch (error) {
        res.json({
            msg: error.message,
        });
    }
};

exports.getOneArchive = async (req, res) => {
    try {
        const id = req.params.id;
        const findQuiz = await Quiz.findById(id);
        console.log(findQuiz.status === 'publish');
        if (findQuiz.status === 'publish') {
            throw new Error('Not a draft this published before');
        }

        res.json({
            findQuiz,
        });
    } catch (error) {
        res.json({
            msg: error.message,
        });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const createdBy = req.tokenValue._id;
        const user = await User.find({ _id: createdBy });
        const _id = req.params.id;
        const checkQuiz = await Quiz.findById(_id);
        console.log(`checkQuiz`, checkQuiz);

        // if (!checkQuiz) {
        //     throw new Error('This quiz not exists');
        // }

        if (user[0].role != 'instructor') {
            throw new Error(
                'You are not allow to change status, For instructors only'
            );
        }

        console.log(
            `user[0].createdBy != createdBy`,
            checkQuiz.createdBy,
            '===',
            createdBy
        );


        if (checkQuiz.createdBy != createdBy) {
            throw new Error('You are not the creator of this exam');
        }

        const { status, questions } = req.body;
        console.log(`new Date(0);`, new Date());

        console.log(checkQuiz.status === 'publish');
        if (checkQuiz.status === 'publish') {
            throw new Error('This quiz published before');
        }

        const quiz = await Quiz.findOneAndUpdate(
            { _id },
            {
                status,
                questions,
                $set: { createdAt: Date.now() },
            },
            { new: true }
        ).populate('questions');

        quiz.updatedAt = new Date(0);
        await quiz.save();
        console.log(`the Quiz`, quiz);
        res.json({
            quiz,
        });
    } catch (error) {
        res.json({
            msg: error.message,
        });
    }
};
