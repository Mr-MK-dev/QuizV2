const express = require('express');
const answerRouter = express.Router();
const answerController = require('./answers.Controller');
const { verfyToken } = require('../../middlewares/jwt');

answerRouter
    .route('/:quizId/answer')
    .post(verfyToken, answerController.getAnswers);

answerRouter
    .route('/user_degress')
    .get(verfyToken, answerController.getDegress);

module.exports = answerRouter;
