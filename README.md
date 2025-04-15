# Book-It Book Search

A full-stack MERN application refactored from REST to GraphQL that allows users to search for books using the Google Books API and save their favorite ones. The app uses Apollo Server, MongoDB Atlas, and is deployed using Render.

## Live Demo
**Frontend:** https://bookit-book-search-1.onrender.com  
**Backend:** https://bookit-book-search.onrender.com/graphql

## Features
- Search for books using the Google Books API
- User authentication with JWT
- Save and delete books to a personal list
- Responsive design using Bootstrap
- GraphQL API for all backend operations

## Tech Stack
- **Frontend:** React, Vite, Apollo Client, Bootstrap
- **Backend:** Node.js, Express.js, Apollo Server, Mongoose, GraphQL
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)

## Scripts
From the root:
```bash
npm run develop       # Starts both client and server in dev mode
npm run build          # Builds both client and server
npm run start          # Starts server (Render uses this for deployment)
```
From `/client`:
```bash
npm run dev            # Run frontend locally (http://localhost:3000)
```
From `/server`:
```bash
npm run watch          # Watch mode for server
npm run build          # Build TypeScript
npm start              # Start server (compiled from dist)
```

## Folder Structure
```
book-search/
├── client/         # React frontend (Vite powered)
├── server/         # Express backend with Apollo Server & GraphQL
│   └── src/        # All TypeScript source code
└── README.md
```

## Environment Variables
Create a `.env` file in `/server`:
```env
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET_KEY=<your secret>
```

## Acknowledgments
- **Joem** — the TA, for helping debug Apollo connection issues
- **ChatGPT** — for real-time troubleshooting, code refactoring, and late-night moral support
- **U of U Coding Bootcamp** — for the starter code and training

