# dbdiagram.io schema

Table projects {
  project_id int PK
  project_name varchar
  description text
  start_date date
  end_date date
  status text
}

Table tasks {
  task_id int PK
  project_id int [ref: > projects.project_id]
  title text
  description text
  status text
  priority int
  assignee_id int [ref: > users.user_id]
  start_date date
  due_date date
}

Table users {
  user_id int PK
  username varchar
  email varchar
  hashed_password text
  role text
}

Table files {
  file_id serial PK
  file_name varchar
  file_path varchar
  uuid varchar
  upload_date timestamp
  user_id int [ref: > users.user_id]
}

Table conversations {
  id int PK
  owner_id int [ref: > users.user_id]
  project_id int [ref: > projects.project_id]
  name varchar
}

Table conversation_participants {
  conversation_id int [ref: > conversations.id]
  participant_id int [ref: > users.user_id]
  Composite PK (conversation_id, participant_id)
}

Table conversation_messages {
  conversation_message_id int PK
  conversation_id int [ref: > conversations.id]
  messenger_id int [ref: > users.user_id]
  message text
  created_at timestamp
}

Table project_to_user {
  project_to_user_id int PK
  project_id int [ref: > projects.project_id]
  user_id int [ref: > users.user_id]
  notification_type text
}

Table task_to_user {
  task_to_user_id int PK
  task_id int [ref: > tasks.task_id]
  user_id int [ref: > users.user_id]
  notification_type text
}

Table notes {
  note_id int PK
  title varchar
  content text
  user_id int [ref: > users.user_id]
  created_at timestamp
  updated_at timestamp
}

Table conversation_messages_to_user {
  conversation_messages_to_user_id PK
  conversation_message_id int [ref: > conversation_messages.conversation_message_id]
  user_id int [ref: > users.user_id]
}

TABLE task_messages {
    task_message_id PK
    task_id int [ref: > tasks.task_id]
    messenger_id int [ref: > users.user_id]
    message text
    created_at timestamp
}

TABLE task_messages_to_user {
    task_message_to_user_id PK
    task_message_id int [ref: > task_messages. task_message_id]
    user_id int [ref: > users.user_id]
}
