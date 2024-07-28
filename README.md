# Hospyta Backend API

## Overview
This project implements a backend API for a community feature in a cross-platform mobile app using Node.js and TypeScript.

## Features
- User registration and login
- Post management (create, edit, delete)
- Upvoting and downvoting posts
- Commenting on posts
- Sorting and filtering posts

## Project Structure
The project follows an MVC pattern with separate directories for controllers, models, routes, services, and utilities.

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hospyta-backend.git
    cd hospyta-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

### Running the Server
1. Start the development server:
    ```bash
    npm run dev
    ```

2. The server should now be running on `http://localhost:8000`.

### Swagger documentation
1. http://localhost:8000/hospypa