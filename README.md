A full-stack Event Management web application built with a Node.js/Express backend and a React/Vite frontend. It allows users to create, view, and manage events, as well as handle user registrations.

🚀 Tech Stack
Backend: Node.js, Express.js, MongoDB, Mongoose
Frontend: React.js, Vite, React Router, React Hot Toast, Axios
Authentication: JSON Web Tokens (JWT) & bcryptjs
✨ Features
User Authentication (Registration & Login)
Create, view, update, and manage events
Event categorization
User registration for events
Responsive and modern UI
Global error handling and validation
📋 Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v16 or higher)
MongoDB (Local instance or MongoDB Atlas URI)
Git
🛠️ Installation & Setup
Follow these steps to get your development environment set up:

1. Clone the repository
bash
git clone https://github.com/yourusername/event-management-app.git
cd event-management-app
2. Backend Setup
Install the backend dependencies:

bash
npm install
3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install its dependencies:

bash
cd frontend
npm install
⚙️ Environment Variables
You need to set up your environment variables for the backend to connect to your database and handle authentication.

In the root directory, rename the .env.example file to .env (or create a new .env file).
Add your configuration details:
env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/event_project_db
JWT_SECRET=your_super_secret_jwt_key
(Make sure MongoDB is running on your machine if you are using the local MONGO_URI)

🏃‍♂️ Running the Application
To run the application locally, you will need two terminal windows—one for the backend and one for the frontend.

Start the Backend Server (Terminal 1)
From the root directory:

bash
# Run in development mode (uses nodemon)
npm run dev
# OR run normally
npm start
The server will start running on http://localhost:3000.

Start the Frontend Application (Terminal 2)
From the frontend directory:

bash
cd frontend
npm run dev
The Vite development server will start, usually on http://localhost:5173.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check issues page.

📝 License
This project is ISC licensed.
