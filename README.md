# GitHub API Integration

This project is a simple Node.js application that integrates with the GitHub API to fetch user data, repository data, and create issues in repositories.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/github-api-integration.git
    cd github-api-integration
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your GitHub token and username:
    ```env
    GITHUB_TOKEN=your_github_token
    GITHUB_USERNAME=your_github_username
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### GET /github

Fetches the authenticated user's GitHub data including followers, following, and repositories.

### GET /github/:repoName

Fetches data about a specific repository.

### POST /github/:repoName/issues

Creates an issue in the specified repository.

#### Request Body
```json
{
  "title": "Issue title",
  "body": "Issue description"
}
```
