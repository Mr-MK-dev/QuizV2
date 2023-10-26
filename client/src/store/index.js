import { configureStore } from "@reduxjs/toolkit";
import examsType from './examsTypes';
import identity from "./identity";
import auth from "./auth";
import qbState from './questionsBank'
import questionActions from "./questionActions";
import createExams from "./createExams";
import openExamDrSlice from './openExamsFtDr'
import draftsSlice from './drafts';
import studentsData from './studentsData'
import studentExam from './studentExam'
import createProfile from './createProfile'
import studentSubmission from './studentSubmission'
export default configureStore({
    reducer: {
        examsType,
        identity,
        auth,
        qbState,
        questionActions,
        createExams,
        openExamDrSlice,
        draftsSlice,
        studentsData,
        studentExam,
        createProfile,
        studentSubmission
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})