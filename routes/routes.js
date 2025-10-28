const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/middleware');

// Auth controllers
const login = require('../controllers/Auth/login');
const register = require('../controllers/Auth/register');

// Teacher controllers
const createAssignment = require('../controllers/Teacher/createAssignment');
const updateAssignment = require('../controllers/Teacher/updateAssignment');
const deleteAssignment = require('../controllers/Teacher/deleteAssignment');
const getTeacherAssignments = require('../controllers/Teacher/getTeacherAssignments');
const getAssignmentSubmissions = require('../controllers/Teacher/getAssignmentSubmissions');

// Student controllers
const getPublishedAssignments = require('../controllers/Student/getPublishedAssignments');
const submitAssignment = require('../controllers/Student/submitAssignment');
const getMySubmissions = require('../controllers/Student/getMySubmissions');

// auth routes
router.post('/auth/login', login);
router.post('/auth/signup', register);

// teacher routes
router.post('/assignments', authenticate, authorizeRole('teacher'), createAssignment);
router.put('/assignments/:id', authenticate, authorizeRole('teacher'), updateAssignment);
router.delete('/assignments/:id', authenticate, authorizeRole('teacher'), deleteAssignment);
router.get('/teacher/assignments', authenticate, authorizeRole('teacher'), getTeacherAssignments);
router.get('/assignments/:id/submissions', authenticate, authorizeRole('teacher'), getAssignmentSubmissions);

// student routes
router.get('/student/assignments', authenticate, authorizeRole('student'), getPublishedAssignments);
router.post('/assignments/:id/submit', authenticate, authorizeRole('student'), submitAssignment);
router.get('/student/submissions', authenticate, authorizeRole('student'), getMySubmissions);

module.exports = router;
