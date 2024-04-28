--projects table and seed data:

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT
);

INSERT INTO projects (project_name, description, start_date, end_date, status)
VALUES
  ('Project A', 'Description for Project A', '2024-05-01', '2024-06-01', 'Active'),
  ('Project B', 'Description for Project B', '2024-05-15', '2024-07-15', 'Inactive'),
  ('Project C', 'Description for Project C', '2024-06-01', '2024-08-01', 'Pending');


--tasks table and seed data:

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT,
    department TEXT,
    priority INTEGER,
    assignee_id INTEGER,
    start_date DATE,
    due_date DATE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (assignee_id) REFERENCES users(user_id)
);



--users table and seed data:

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role TEXT,
    hashed_password TEXT
);





-- files table and seed data:

CREATE TABLE files (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    upload_date TIMESTAMP NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



--conversations table and seed data:

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(project_id)
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);




--conversation_participants table and seed data:

CREATE TABLE conversation_participants (
    conversation_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    PRIMARY KEY (conversation_id, participant_id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (participant_id) REFERENCES users(user_id)
);



--conversation_messages table and seed data:

CREATE TABLE conversation_messages (
    conversation_message_id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    messenger_id INTEGER NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW();
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (messenger_id) REFERENCES users(user_id)
);



--convestation_messages_to_user table and seed data:
CREATE TABLE conversation_messages_to_user (
    conversation_messages_to_user_id SERIAL PRIMARY KEY,
    conversation_message_id INT REFERENCES conversation_messages(conversation_message_id),
    user_id INT REFERENCES users(user_id)
);


--project to user table and seed data:

CREATE TABLE project_to_user (
    project_to_user_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    user_id INT REFERENCES users(user_id),
    notification_type TEXT
);

--task_to_user table and seed data:

CREATE TABLE task_to_user (
    task_to_user_id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(task_id),
    user_id INT REFERENCES users(user_id),
    notification_type TEXT
);

--notes table and seed data:

CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    title VARCHAR,
    content TEXT,
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

--task_messages table and seed data:

CREATE TABLE task_messages (
    task_message_id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(task_id),
    messenger_id INT REFERENCES users(user_id),
    message TEXT,
    created_at TIMESTAMP
);

--task messages_to_user table and seed data:

CREATE TABLE task_messages_to_user (
    task_message_to_user_id SERIAL PRIMARY KEY,
    task_message_id INT REFERENCES task_messages(task_message_id),
    user_id INT REFERENCES users(user_id)
);
