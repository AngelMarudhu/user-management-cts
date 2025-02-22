# User Management Application with RBAC and CRUD Operations with MERN Stack REACT + VITE

# Overview of the project and features

# Hey this is user-management application built with the MERN tech stack which is frontend(React.js) and backend(Node.js) we just built this application with RBAC(Role-Based Access Control) so user can login with different roles and can perform crud operations on the user page at the same time admin can perform crud operations on the user page and admin can also perform crud operations on the role page and admin can also perform manage users by creating, updating, viewing, and deleting user information this application follows monolith and MVC pattern architecture with strong focus on modular and scalable architecture

# Credentials for admin

1. email: admin1@example.com
2. password: admin123

# Credentials for user

1. email: you can create user with email and password
2. password: you can create user with email and password

# Features

1. User Authentication and Authorization (JWT)
2. Role-Based Access Control (RBAC)
3. CRUD Operations
4. User Management
5. Role Management
6. Protected Routes
7. Optimized Performance and Code Splitting for Enhanced User Experience
8. Responsive Design for Mobile and Desktop
9. State manageement with Redux Toolkit
10. Toast Notifications for User Feedback
11. On the admin page displays all the users with their profile picture and email and role as well as admin can perform crud operations on the user page

# Technologies Used

1. React.js
2. Node.js
3. Express.js
4. MongoDB
5. Tailwind CSS for Styling
6. Mongoose
7. Redux Toolkit
8. React Router
9. React Toastify
10. React Icons

# Installation and Setup

1. Clone the repository: git clone https://github.com/your-username/your-repo.git
2. Navigate to the project directory: cd repository
3. Install dependencies: npm install
4. Start your fronend app npm run dev
5. Start the development server: npm start
6. Open your browser and visit http://localhost:5000 to access the application
7. Server runnion on the port 5001

# API Endpoints

## For ADMIN

1. Get all users: adminRouter.get("/get-users", getUsers);
2. Update users: adminRouter.put("/update-user/:userId",updateUser);
3. Delete users: adminRouter.delete("/delete-user/:userId", deleteUser);

## For USER

1. Register: loginRouter.post("/register", upload.single("profilePicture"), userRegister);
2. Login: loginRouter.post("/login", userLogin);
3. Update User Profile: loginRouter.put("/updateProfilePicture",updateUserProfile);
4. Get User Profile: loginRouter.get("/get-profile",getUserProfile);
