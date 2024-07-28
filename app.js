const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());

const ADZUNA_BASE_URL = "http://api.adzuna.com/v1/api/jobs/gb/search/1";
const UDEMY_BASE_URL = "https://www.udemy.com/api-2.0/courses/";

app.get('/search-jobs', async (req, res) => {
    try {
        const { what, where, results_per_page = 20 } = req.query;
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

        const searchTerms = what; // Use the job search term for finding related courses
        const courseResponse = await axios.get(UDEMY_BASE_URL, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.UDEMY_CLIENT_ID}:${process.env.UDEMY_CLIENT_SECRET}`).toString('base64')}`
            },
            params: {
                page_size: 10,
                page: 1,
                search: searchTerms,
                ordering: 'relevance' // You can adjust this based on your requirements
            }
        });
        console.log("Courses data:", courseResponse.data);

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

app.get('/', (req, res) => {
    res.render('search', { query: {} }); // Ensure 'search.pug' is ready in your views directory
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
