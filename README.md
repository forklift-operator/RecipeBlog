# RecipeBlog 

A full-stack recipe-sharing application built with **React (TypeScript)** for the frontend and **Simple json-server** for the backend (switching to express in the near future). Users can browse, post, and manage recipes, while admins have additional user management capabilities.

## Features 

### For All Users
- **Browse Recipes** – Filter by category, difficulty, cooking time, and ratings
- **Create & Edit Recipes** – Post your own recipes with images, ingredients, and steps
- **User Authentication** – Sign up, log in, and manage your profile

### Admin Features
- **User Management** – View, edit, or delete user accounts
- **Content Moderation** – Manage reported recipes or comments (IN DEVELOPMENT)
- **Dashboard** – View application statistics and insights (IN DEVELOPMENT)

### Technical Highlights
- **TypeScript** – Full-stack type safety
- **JWT Authentication** – Secure user sessions (IN DEVELOPMENT)
- **Image Uploads** – Cloudinary integration for recipe photos


## Installation & Setup ⚙️

### Prerequisites
- Node.js

### Setup
```bash
npm install
```

### Backend Setup
```bash
json-server --watch db.json --port 8080
```

### Frontend Setup
```bash
npm run dev
```

The app should now be running on http://localhost:5173 with the backend on http://localhost:8080.