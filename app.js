// Required modules
const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// Set Pug as the view engine and specify the directory for view templates
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API base URLs
const ADZUNA_BASE_URL = "http://api.adzuna.com/v1/api/jobs/gb/search/1";
const UDEMY_BASE_URL = "https://www.udemy.com/api-2.0/courses/";

// Route for job search that also fetches related courses
app.get('/search-jobs', async (req, res) => {
    try {
        const { what, where, results_per_page = 20 } = req.query;
        // Fetch jobs from Adzuna
        const jobParams = {
            app_id: process.env.ADZUNA_APP_ID,
            app_key: process.env.ADZUNA_APP_KEY,
            what,
            where,
            results_per_page,
            'content-type': 'application/json'
        };

        const jobResponse = await axios.get(ADZUNA_BASE_URL, { params: jobParams });
        console.log("Jobs data:", jobResponse.data.results);

        // Fetch courses from Udemy using job search terms
        const searchTerms = what;
        const courseResponse = await axios.get(UDEMY_BASE_URL, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.UDEMY_CLIENT_ID}:${process.env.UDEMY_CLIENT_SECRET}`).toString('base64')}`
            },
            params: {
                page_size: 10,
                page: 1,
                search: searchTerms,
                ordering: 'relevance'
            }
        });
        console.log("Courses data:", courseResponse.data);

        // Render the index page with fetched data
        res.render('index', {
            jobs: jobResponse.data.results,
            courses: courseResponse.data.results || [],
            query: req.query
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).send("Error fetching data: " + error.message);
    }
});

// Route for course details
app.get('/course-details/:pk', async (req, res) => {
    const courseId = req.params.pk;
    try {
        const response = await axios.get(`${UDEMY_BASE_URL}${courseId}/`, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.UDEMY_CLIENT_ID}:${process.env.UDEMY_CLIENT_SECRET}`).toString('base64')}`,
                'Accept': 'application/json'
            }
        });
        console.log("Course data:", response.data);
        res.render('course-details', { course: response.data });
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).send("Error fetching course details: " + error.message);
    }
});

// Default route to display the search page
app.get('/', (req, res) => {
    res.render('search', { query: {} });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
