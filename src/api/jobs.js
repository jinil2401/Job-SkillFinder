// src/api/jobs.js
const express = require('express');
const router = express.Router();
const jobService = require('../services/jobSevice');

router.get('/', async (req, res) => {
    try {
        const jobs = await jobService.findJobs(req.query);
        res.render('jobs', { jobs });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
