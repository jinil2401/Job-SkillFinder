// src/api/courses.js
const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');

router.get('/', async (req, res) => {
    try {
        const courses = await courseService.findCourses();
        res.render('courses', { courses });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
