-- seed.sql
INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES
('Project 1', 'Description of Project 1', '2024-04-15', '2024-05-15', 'Active'),
('Project 2', 'Description of Project 2', '2024-04-20', '2024-06-20', 'Completed');

INSERT INTO tasks (title, description, project_id, status, priority, assignee_id, start_date, due_date) VALUES
('Initial Task', 'This is a sample task.', 1, 'Open', 1, 1, '2024-01-01', '2024-01-31'),
INSERT INTO tasks (title, description, project_id, status, priority, assignee_id, start_date, due_date) VALUES
('Develop Feature X', 'Develop and test the new feature X as described in the requirements document.', 1, 'Active', 2, 1, '2024-02-01', '2024-02-28');



INSERT INTO users (user_id, username, email, role) VALUES
(1, 'user1', 'user1@example.com', 'Developer'),
(2, 'user2', 'user2@example.com', 'Manager');
