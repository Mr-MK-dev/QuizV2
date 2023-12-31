const express = require('express');
const quizRouter = express.Router();
const quizController = require('./quiz.Controller');
const { verfyToken } = require('../../middlewares/jwt');

quizRouter
    .route('/quiz')
    .get(verfyToken, quizController.getUserQuiz)
    .post(verfyToken, quizController.createQuiz);
quizRouter.route('/quiz/:id').get(quizController.getById);

quizRouter
    .route('/quizbycategory')
    .get(verfyToken, quizController.getQuizViaCategory);

// Quiz
quizRouter.route('/test/:quizId').get(quizController.getQuiz);

quizRouter.route('/last_exam').get(quizController.getLastExam);

module.exports = quizRouter;
