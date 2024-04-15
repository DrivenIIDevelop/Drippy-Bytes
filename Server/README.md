# Drippy Bytes - Backend Database Design, API Development, Routes, Authenticaiton and Authorization


## **Initial Working Outline:**

**1. Database Design**

* **Task Management**: We will need a robust database schema to handle tasks, which includes fields like task ID, description, status, priority, deadlines, assignee, etc.
* **Projects**: Since tasks are part of projects, the database should also have a table for projects, with fields like project ID, project name, start date, end date, and status.
* **Users**: To manage assignments and collaboration, a users table will be necessary, containing user ID, name, email, role, etc.

⠀**2. API Development**

* **Task Management APIs**: Develop RESTful APIs to create, update, delete, and fetch tasks. Implement filtering, sorting, and pagination for task listing.
* **Collaboration APIs**: Create endpoints for file uploads/downloads, comments on tasks, and notifications. Make sure these APIs integrate seamlessly with the task and project modules.

⠀**3. Authentication and Authorization**

* Implement secure login/logout functionality.
* Define roles (like admin, project manager, team member) and permissions for different types of users to ensure that they can only access what they are supposed to.

⠀**4. Integration with Frontend**

* Ensure the APIs are well documented and easy to integrate with the frontend.
* Consider using technologies like WebSockets or long polling for real-time updates in task statuses and notifications to enhance the collaborative aspect of the tool.

⠀**5. Testing and Documentation**

* Write comprehensive unit and integration tests for the backend logic.
* Ensure the code is well-documented, making it easier for other developers to understand and work with your APIs.

⠀**Tools and Technologies**

* **Backend Frameworks**: Consider using frameworks like Express.js (Node.js)
* **Database**: PostgreSQL, MySQL, could be good choices depending on the project's complexity and data structure needs.
* **Collaboration and Real-Time Features**: Look into using WebSocket for real-time communication or services like Firebase for real-time database updates and notifications.

#### **Database Design and Ideas:**

By starting with this structure, we can handle the basic requirements of task management in project management software. As the project evolves, we might need to add more fields or tables (like comments, attachments, task history, etc.) to accommodate additional features.

##### Define Tables

**For a basic project management tool, you will need at least the following tables:**

* **Projects**: To store information about each project.
* **Tasks**: To store details about tasks.
* **Users**: To manage user information, including their roles and responsibilities.

 **Projects Table Structure:**

*This table will hold information about the projects being managed. Here’s a simple structure:*

|                  |                                                              |
|------------------|--------------------------------------------------------------|
| **project_id**   | *PK; unique identifier for each project*                     |
| **project_name** | *Text/Varchar, name of the project*                          |
| **description**  | *Text/Varchar; description of the project***                 |
| **start_date**   | *Date; project start date*                                   |
| **end_date**     | *Date; project due date*                                     |
| **status**       | *Text, Current status of the project (e.g., Active, Completed, On Hold)* |

**Tasks Table Structure:**

*This table will hold information about the tasks being managed. Here’s a simple structure:*

|             |                                                              |
|-------------|--------------------------------------------------------------|
| task_id     | *PK; unique identifier for each task*                        |
| project_id  | *FK; Links to the Projects table to indicate which project the task belongs to.* |
| title       | *Text; Brief title of the task*                              |
| description | *Text, Detailed  description of each task*                   |
| status      | *Text; Current status of the task (e.g., Pending, In Progress, Completed).* |
| priority    | *integer; priority level of task*                            |
| assignee_id | *FK; Links to the Users table to indicate who is responsible for the task* |
| start_date  | *Date, task start date*                                      |
| due_date    | *Date*                                                       |

**Users Table Structure:**

*This table will manage the users involved in the project:*

|          |                                                              |
|----------|--------------------------------------------------------------|
| user_id  | PK, unique identifier for each user                          |
| username | Text, the name or alias of the user                          |
| email    | Text, User’s email address                                   |
| role     | text, User’s role within the team (ie. Admin, Project Manager, Devleoper, etc) |


**Table Name:** files

| Column       | Data Type         | Description                                         |
|--------------|-------------------|-----------------------------------------------------|
| file_id      | Serial, Primary Key | Auto-incrementing unique identifier for each file. |
| file_name    | VARCHAR           | Name of the uploaded file.                          |
| file_path    | VARCHAR           | Path to the file on the server or cloud storage URL.|
| uuid         | VARCHAR           | Universally Unique Identifier (UUID) for each file. |
| upload_date  | TIMESTAMP         | Timestamp indicating when the file was uploaded.    |
| user_id      | INT               | Foreign key to associate files with specific users (if applicable). |

### File Upload Endpoint

**Endpoint:** POST /upload


**Steps:**
1. Receive a file upload request.
2. Store the file in the server's upload directory.
3. Generate a UUID for the file.
4. Insert metadata (file name, path, UUID, upload date, user ID) into the files table.





***Relationships***

* A **one-to-many** relationship between Projects and Tasks: Each project can have multiple tasks, but each task belongs to only one project.

* A **one-to-many** relationship between Users and Tasks: Each user can have multiple tasks assigned, but each task has only one assignee.

***Indexing and Optimization***

* Index fields that are frequently queried or used in join operations, like project_id in the Tasks table and user_id in the Users table, to improve performance.
* Consider the use of composite indexes if there are common queries involving multiple columns.

## API Development

 *Defining our RESTful Endpoints based on Database Design above:*

**Projects:**

* GET /projects: ***List all projects.***
* POST /projects: ***Create a new project.***
* GET /projects/{projectId}: ***Get a single project by ID.***
* PUT /projects/{projectId}: ***Update a project by ID.***
* DELETE /projects/{projectId}: ***Delete a project by ID.***

**Tasks:**

* GET /projects/{projectId}/tasks: ***List all tasks for a specific project.***
* POST /projects/{projectId}/tasks: ***Create a new task within a project.***
* GET /tasks/{taskId}: ***Get a single task by ID.***
* PUT /tasks/{taskId}: ***Update a task by ID.***
* DELETE /tasks/{taskId}: ***Delete a task by ID.***

**Users:**

* GET /users: ***List all users.***
* POST /users: ***Create a new user.***
* GET /users/{userId}: ***Get a single user by ID.***
* PUT /users/{userId}: ***Update a user by ID.***
* DELETE /users/{userId}: ***Delete a user by ID.***

#### Implement CRUD Operations

*For each endpoint, implement the CRUD (Create, Read, Update, Delete) operations. This typically involves:*

* Validating input data.
* Performing the requested operation in the database (e.g., querying, inserting, updating, deleting).
* Returning the result or status (and possibly the modified data) in the response.

**Ensure RESTful Principles**
*Make sure the API follows RESTful principles, such as stateless operations and meaningful HTTP status codes (e.g., 200 OK, 201 Created, 400 Bad Request, 404 Not Found).*

**Authentication and Authorization**
*Implement authentication (e.g., with JWT tokens) to ensure that users are logged in before accessing sensitive endpoints. Add authorization checks to make sure users have the right permissions to perform actions.*

**File Uploads/Downloads**

* **File Uploads**
  * Endpoint: POST /projects/{projectId}/tasks/{taskId}/files
  * Use middleware like multer in Express.js to handle file uploads.
  * Store the file in a directory on the server or in cloud storage (like AWS S3).
  * Save a reference to the file (path, URL, metadata) in the database associated with the specific task.
* **File Downloads**
  * Endpoint: GET /files/{fileId}
  * Fetch the file’s metadata from the database using the fileId to get the storage location.
  * Stream the file from the server or redirect to the cloud storage URL for direct download.

**Comments on Tasks**

* **Add a Comment**
  * Endpoint: POST /tasks/{taskId}/comments
  * Accepts a JSON payload containing the comment text and author information.
  * Validate the input and associate the comment with the task and the user who made it.
* **List Comments**
  * Endpoint: GET /tasks/{taskId}/comments
  * Fetch and return all comments associated with a specific task, possibly with pagination.

**Notifications**

* **Triggering Notifications**
  * Notifications can be triggered by various actions (task creation/update, new comment, file upload, etc.).
  * Implement a service in the backend that creates a notification record in the database whenever such actions occur.
* **Fetching Notifications**
  * Endpoint: GET /users/{userId}/notifications
  * Return a list of notifications for the user, which can be marked as read/unread.
* **Real-time Notifications**
  * Consider using WebSockets? or a similar technology to push notifications to the client in real-time.
  * Endpoint could be a WebSocket endpoint that clients connect to, and receive notifications as they happen.

**Integrating with Task and Project Modules**

* Ensure that the collaboration APIs are closely integrated with the tasks and projects. For example, comments should be easily accessible from the task objects, and files should be linked to the tasks or projects they are associated with.
* Use foreign keys and relational database principles to link files, comments, and notifications with their respective tasks, projects, and users.

**Implementation Tips**

* For file storage, consider setting limits on file size and type to prevent abuse.
* Ensure that APIs for sensitive actions like adding comments or uploading files are protected and only accessible by users who have the right permissions.
* Include thorough error handling and validation to ensure that the APIs are robust and secure.

Finally we want to Implement a robust authentication and authorization system. This is crucial for the security and functionality of the project management software.

Here’s how we can approach this:

**Authentication**

**Login**

* Implement a login endpoint (e.g., POST /login) where users can submit their credentials (username/email and password).
* Validate the credentials against the database. If the credentials are correct, generate a token (e.g., JWT) and send it back to the user.
* Use a library like **bcrypt** for securely hashing and checking passwords.

⠀**Logout**

* For token-based authentication (like JWT), logout can be handled client-side by discarding the token. However, we can also implement a server-side blacklist mechanism for tokens if needed.

⠀**Token Management**

* Use JWT (JSON Web Tokens) for stateless authentication. When a user logs in, generate a JWT and send it to the client.
* The client should send this token in the Authorization header for subsequent requests that require authentication.

⠀**2. Authorization**
**Role-Based Access Control (RBAC)**

* Define roles within the system, e.g., Admin, Project Manager, Team Member.
* Assign permissions to these roles that define what actions each role can perform. For example, an Admin might have permissions to create projects, assign project managers, etc., while a Team Member might only have permission to view tasks and update their status.

⠀**Implementing Permissions**

* Use middleware in the routes to check if the authenticated user has the necessary permissions to perform the requested action.
* This can be done by decoding the JWT token, extracting the user’s role, and verifying if the role has the required permissions for the action.

⠀**Secure Endpoints**

* Secure the API endpoints by ensuring that only authenticated and authorized users can access them.
* For example, use middleware to protect routes that should only be accessible to logged-in users with the appropriate roles.

Here’s an implementation example…..

`const jwt = require('jsonwebtoken');`
`const { User } = require('../models');`

`// Middleware to validate token and check user role`
`const authorize = (roles = []) => {`
    `return (req, res, next) => {`
        `const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the "Authorization" header`
        `const decoded = jwt.verify(token, 'your_secret_key');`

        `User.findById(decoded.userId).then(user => {`
            `if (!user || !roles.includes(user.role)) {`
                `return res.status(403).json({ message: 'Unauthorized' });`
            `}`

            `req.user = user; // Add user to request object`
            `next();`
        `}).catch(error => {`
            `res.status(401).json({ message: 'Invalid token', error: error.toString() });`
        `});`
`};`

`// Usage in a route`
`app.get('/some-protected-route', authorize(['Admin', 'Project Manager']), (req, res) => {`
    `res.json({ message: 'You have access to this protected route' });`
`});`

In this setup:

* The authorize middleware function checks if the user has a valid token and the required role to access a route.
* It uses the roles array to determine which roles are authorized to access the route it protects.
