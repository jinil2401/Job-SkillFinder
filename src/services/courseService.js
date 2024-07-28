// src/services/courseService.js
const axios = require('axios');
const dotenv = require('dotenv')


exports.findCourses = async () => {
    const response = await axios.get('https://www.udemy.com/api-2.0/courses/', {
        headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.UDEMY_CLIENT_ID}:`).toString('base64')}`
        }
    });
    return response.data;
};
