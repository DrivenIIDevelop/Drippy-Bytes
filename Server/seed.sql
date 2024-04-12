-- seed.sql
INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES
('Project 1', 'Description of Project 1', '2024-04-15', '2024-05-15', 'Active'),
('Project 2', 'Description of Project 2', '2024-04-20', '2024-06-20', 'Completed');

INSERT INTO tasks (project_id, title, description, status, priority, assignee_id, start_date, due_date) VALUES
(1, 'Task 1 for Project 1', 'Description of Task 1 for Project 1', 'Pending', 1, 1, '2024-04-15', '2024-04-30'),
(1, 'Task 2 for Project 1', 'Description of Task 2 for Project 1', 'In Progress', 2, 2, '2024-04-20', '2024-05-15');


INSERT INTO users (username, email, role) VALUES
('user1', 'user1@example.com', 'Developer'),
('user2', 'user2@example.com', 'Manager');




