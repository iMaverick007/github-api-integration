require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const githubToken = process.env.GITHUB_TOKEN;
const githubApiBaseUrl = 'https://api.github.com';
const headers = { Authorization: `Bearer ${githubToken}` };

// GET /github → Show your GitHub data
app.get('/github', async (req, res) => {
    try {
        const userResponse = await axios.get(`${githubApiBaseUrl}/user`, { headers });
        const reposResponse = await axios.get(`${githubApiBaseUrl}/user/repos`, { headers });
        const { followers, following } = userResponse.data;

        res.json({
            followers,
            following,
            repositories: reposResponse.data.map(repo => repo.name),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /github/:repo-name → Show data about that project
app.get('/github/:repoName', async (req, res) => {
    const { repoName } = req.params;
    try {
        const repoResponse = await axios.get(`${githubApiBaseUrl}/repos/${process.env.GITHUB_USERNAME}/${repoName}`, { headers });
        res.json(repoResponse.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /github/:repo-name/issues → Create an issue in a repo
app.post('/github/:repoName/issues', async (req, res) => {
    const { repoName } = req.params;
    const { title, body } = req.body;

    try {
        const issueResponse = await axios.post(
            `${githubApiBaseUrl}/repos/${process.env.GITHUB_USERNAME}/${repoName}/issues`,
            { title, body },
            { headers }
        );
        res.json({ issue_url: issueResponse.data.html_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});