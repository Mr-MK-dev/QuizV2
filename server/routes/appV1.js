const express = require('express');
var authRouter = require('./auth/auth.route');
var quizRouter = require('./quizes/quiz.route');
var questionRouter = require('./questions.route');
var answerRouter = require('./answers/answers.Route');
var scoreRouter = require('./score/score.routes');
var dashboardRouter = require('./dashboard/dashboard.routes');
var archiveRouter = require('./archive/archive.routes');
var qrRouter = require('./qr/qr.Route');

var router = express.Router();

router.use('', authRouter);
router.use('', archiveRouter);
router.use('', quizRouter);
router.use('', questionRouter);
router.use('', answerRouter);
router.use('', scoreRouter);
router.use('', dashboardRouter);
router.use('', qrRouter);

module.exports = router;
