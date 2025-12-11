Pro-Tasker Backend API

I used Node.js + Express + JavaScript for this application.

This API handles:
	• User registration & login (JWT authentication)
	• Project CRUD operations
	• Task CRUD operations (project-scoped)
	• Protected routes with auth middleware
	• MongoDB database storage

 API Overview
 Authentication
Method	Endpoint			Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Log in and receive a token

 Projects
Method	Endpoint				Description
POST	/api/projects			Create a new project
GET		/api/projects			Get all projects for logged-in user
GET		/api/projects/:id		Get a single project
PUT		/api/projects/:id		Update a project
DELETE	/api/projects/:id		Delete a project

 Tasks
Method	Endpoint						Description
POST	/api/projects/:projectId/tasks	Create a task
GET		/api/projects/:projectId/tasks	Get tasks for project
GET		/api/tasks/:taskId				Get a single task
PUT		/api/tasks/:taskId				Update a task
DELETE	/api/tasks/:taskId				Delete a task

 Tech Stack
	• Node.js 
	• Express
	• JavaScript
	• MongoDB (Mongoose)
	• JSON Web Tokens (JWT)
	• CORS
	• bcrypt.js
	• dotenv

 Environment Variables
Create a .env file:
PORT=
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=https://protasker-frontend.netlify.app
(Make sure FRONTEND_URL has no trailing slash to avoid CORS errors. Many of us was facing this issue)

 Deployment
Backend (Render)
The API is deployed on Render:
https://pro-tasker-backend-61bs.onrender.com

CORS Configuration
To make sure CORS settings allow the frontend I have CORS setup as below in my server.js:
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    
  })
);

Running Locally
Install dependencies:
npm install
Start server:
npm run dev
API runs at:
http://localhost:5173


 Testing Endpoints
I used Postman, but you can also use Thunder Client, or cURL or others.
Example — Login:
POST /api/users/login
{
  "email": "user777@test.com",
  "password": "password123"
}
