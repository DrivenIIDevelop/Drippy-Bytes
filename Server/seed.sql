--Projects table and seed data:

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT
);
INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES
('Project 1', 'Description of Project 1', '2024-04-15', '2024-05-15', 'Active'),
('Project 2', 'Description of Project 2', '2024-04-20', '2024-06-20', 'Completed');


--Tasks table and seed data:

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT,
    priority INTEGER,
    assignee_id INTEGER,
    start_date DATE,
    due_date DATE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (assignee_id) REFERENCES users(user_id)
);
INSERT INTO tasks (title, description, project_id, status, priority, assignee_id, start_date, due_date) VALUES
('Initial Task', 'This is a sample task.', 1, 'Open', 1, 1, '2024-01-01', '2024-01-31'),
INSERT INTO tasks (title, description, project_id, status, priority, assignee_id, start_date, due_date) VALUES
('Develop Feature X', 'Develop and test the new feature X as described in the requirements document.', 1, 'Active', 2, 1, '2024-02-01', '2024-02-28');


--Users table and seed data:

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role TEXT
);
INSERT INTO users (user_id, username, email, role) VALUES
(1, 'user1', 'user1@example.com', 'Developer'),
(2, 'user2', 'user2@example.com', 'Manager');



-- Files table and seed data:

CREATE TABLE files (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    upload_date TIMESTAMP NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO files (file_name, file_path, uuid, upload_date, user_id)
VALUES
  ('testFile', '/uploads/test_file.pdf', 'a1b2c3d4-1234-5678-abcd-1234567890ab', '2024-04-20 10:00:00', 1),


--Conversations table and seed data:

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
INSERT INTO conversations (owner_id, name) VALUES
(1, 'Project Kickoff'),
(2, 'Development Updates'),
(1, 'UI/UX Design Meeting'),
(2, 'Budget Review'),
(1, 'Project Retrospective');


--Conversation_participants table and seed data:

CREATE TABLE conversation_participants (
    conversation_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    PRIMARY KEY (conversation_id, participant_id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (participant_id) REFERENCES users(user_id)
);
INSERT INTO conversation_participants (conversation_id, participant_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);


--Conversation_messages table and seed data:

CREATE TABLE conversation_messages (
    conversation_message_id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    messenger_id INTEGER NOT NULL,
    message TEXT,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (messenger_id) REFERENCES users(user_id)
);
INSERT INTO conversation_messages (conversation_id, messenger_id, message) VALUES
(1, 1, 'Hello, how are you?');

