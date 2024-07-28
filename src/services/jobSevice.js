// src/services/jobService.js
const axios = require('axios');
const dotenv = require('dotenv')

exports.findJobs = async (params) => {
    const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1`, {
        params: {
            app_id: process.env.ADZUNA_APP_ID,
            app_key: process.env.ADZUNA_API_KEY,
            results_per_page: 10,
            what: params.search || 'javascript'
        }
    });
    return response.data;
};
