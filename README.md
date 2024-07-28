# Job and Course Finder

-Job and Course Finder is a Node.js web application that helps users find job listings and suggests courses relevant to their career interests. Enter your job search criteria, and Job and Course Finder will provide you with job listings and course suggestions that match your interests!

## Features
- **Job Search**: Enter your job search criteria and get job listings from Adzuna.
- **Course Suggestions**: Get Udemy course recommendations based on the job search.
- **Integration with Adzuna API**: Uses Adzuna API to retrieve job listings.
- **Integration with Udemy API**: Searches for and retrieves suggested courses from Udemy.

## Table of Contents
- Installation
- Usage
- Environment Variables
- How to Use
- API Credits

## Installation
1. Clone the repository:

```bash
git clone https://github.com/yourgithubusername/job-and-course-finder.git
cd job-and-course-finder
```
2. Install the required dependencies:

```bash
npm install
```
3. Create a .env file in the root directory and add your environment variables (see Environment Variables).

## Usage
1. Start the application:
```bash
npm start
```
2. Open your browser and navigate to http://localhost:3000.

3. Enter your search criteria in the form and submit it to get job listings and course suggestions.

# Environment Variables
-Create a .env file in the root directory of your project and add the following variables:

```plaintext
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
UDEMY_CLIENT_ID=your_udemy_client_id
UDEMY_CLIENT_SECRET=your_udemy_client_secret
```
## How to Use

**Enter Your Search Criteria**:
-On the home page, there is a form where you can enter job search criteria such as job title, location, etc.

**Submit the Form**:
-After entering your criteria, click the submit button to send your request to the server. The server processes your input using the Adzuna API to fetch job listings and the Udemy API to suggest relevant courses.

**View Job Listings and Courses**:
-The application will display job listings and course suggestions on the same page, allowing you to explore available jobs and related educational courses.

## Example Searches to Try
-"Data Scientist in New York"
-"Front-end Developer remote jobs"
-"Project Management courses for beginners"

## API Credits
-**Adzuna API**: Used for fetching job listings. Learn more at Adzuna API(https://developer.adzuna.com/).

-**Udemy API**: Used for searching and retrieving courses based on the job titles. You can learn more at Udemy API(https://www.udemy.com/developers/affiliate/).
