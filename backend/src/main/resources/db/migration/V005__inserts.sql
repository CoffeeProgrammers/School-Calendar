INSERT INTO "users" ("email", "password", "role", "first_name", "last_name", "description", "token", "birthday") VALUES
('john@example.com', '$2a$12$tCc7xjpcZZg0PT57MxYmX.3Pp2gedmXUHfS86IHz5Y8RUoIKq.Ma6',
 0, 'Johnotan', 'Doe', 'Math teacher', 'token1', '1980-06-15 00:00:00'),
('alice@example.com', '$2a$12$tCc7xjpcZZg0PT57MxYmX.3Pp2gedmXUHfS86IHz5Y8RUoIKq.Ma6',
 1, 'Alice', 'Smith', 'High school student', 'token2', '2008-03-22 00:00:00'),
('bob@example.com', '$2a$12$tCc7xjpcZZg0PT57MxYmX.3Pp2gedmXUHfS86IHz5Y8RUoIKq.Ma6',
 2, 'Bob', 'Johnson', 'Parent of Alice', 'token3', '1975-11-10 00:00:00'),
('carol@example.com', '$2a$12$tCc7xjpcZZg0PT57MxYmX.3Pp2gedmXUHfS86IHz5Y8RUoIKq.Ma6',
 0, 'Carol', 'Brown', 'Science teacher', 'token4', '1985-09-05 00:00:00'),
('eve@example.com', '$2a$12$tCc7xjpcZZg0PT57MxYmX.3Pp2gedmXUHfS86IHz5Y8RUoIKq.Ma6',
 1, 'Eve', 'Davis', 'Student', 'token5', '2007-01-30 00:00:00');

INSERT INTO "events" ("creator_id", "name", "type", "start_date", "end_date", "content", "is_content_available_anytime", "place") VALUES
(1, 'Math Class', 0, '2025-05-10 09:00:00', '2025-05-10 10:30:00', 'Algebra basics', false, 'Room 101'),
(2, 'Science Fair', 4, '2025-06-05 14:00:00', '2025-06-05 17:00:00', 'Annual event', true, 'School Hall'),
(4, 'Teachers Meeting', 0, '2025-05-15 10:00:00', '2025-05-15 12:00:00', 'Staff discussion', false, 'Meeting Room');

INSERT INTO "tasks" ("creator_id", "event_id", "name", "content", "deadline") VALUES
(1, 1, 'Homework 1', 'Solve exercises 1–10', '2025-05-12 23:59:00'),
(2, 2, 'Prepare Poster', 'Create a presentation poster for the fair', '2025-06-03 20:00:00'),
(4, 3, 'Meeting Notes', 'Summarize the outcomes', '2025-05-16 18:00:00');


