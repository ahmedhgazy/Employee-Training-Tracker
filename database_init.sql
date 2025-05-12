-- Create the training_tracker database
CREATE DATABASE IF NOT EXISTS training_tracker;
USE training_tracker;

-- Create tables for the Training Program Service
CREATE TABLE IF NOT EXISTS training_program (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    created_by VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS training_session (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(255),
    trainer VARCHAR(255),
    max_attendees INT,
    training_program_id BIGINT,
    FOREIGN KEY (training_program_id) REFERENCES training_program(id) ON DELETE CASCADE
);

-- Create tables for the Employee Service
CREATE TABLE IF NOT EXISTS employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    employee_id VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS program_enrollment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    program_id BIGINT NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    enrollment_date DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    employee_id BIGINT,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
);

-- Create tables for the Tracking Service
CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    employee_name VARCHAR(255),
    session_name VARCHAR(255),
    attendance_time DATETIME NOT NULL,
    present BOOLEAN NOT NULL,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS completion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    program_id BIGINT NOT NULL,
    employee_name VARCHAR(255),
    program_name VARCHAR(255),
    completion_date DATETIME NOT NULL,
    score DOUBLE,
    status VARCHAR(50) NOT NULL,
    certificate_url VARCHAR(512),
    completed_by VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    program_id BIGINT NOT NULL,
    employee_name VARCHAR(255),
    program_name VARCHAR(255),
    rating INT,
    comments TEXT,
    provided_by VARCHAR(255),
    feedback_date DATETIME NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- Insert sample data for testing
INSERT INTO training_program (name, description, category, created_by) VALUES
('Java Developer Bootcamp', 'Comprehensive Java training for developers', 'Programming', 'admin'),
('Leadership Skills', 'Management and leadership training', 'Soft Skills', 'admin'),
('Cloud Computing Essentials', 'Introduction to AWS, Azure, and GCP', 'Cloud', 'admin');

INSERT INTO training_session (title, description, start_time, end_time, location, trainer, max_attendees, training_program_id) VALUES
('Java Basics', 'Introduction to Java programming language', '2025-06-01 09:00:00', '2025-06-01 17:00:00', 'Room 101', 'John Doe', 20, 1),
('Advanced Java', 'Advanced Java concepts including threading', '2025-06-08 09:00:00', '2025-06-08 17:00:00', 'Room 101', 'John Doe', 20, 1),
('Team Building Workshop', 'Interactive workshop for building team skills', '2025-06-15 13:00:00', '2025-06-15 17:00:00', 'Conference Hall', 'Jane Smith', 30, 2),
('AWS Fundamentals', 'Introduction to AWS services', '2025-06-22 09:00:00', '2025-06-22 17:00:00', 'Online', 'Mike Johnson', 50, 3);

INSERT INTO employee (first_name, last_name, email, department, position, employee_id) VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', 'IT', 'Software Developer', 'EMP-001'),
('Bob', 'Smith', 'bob.smith@example.com', 'IT', 'System Administrator', 'EMP-002'),
('Carol', 'Davis', 'carol.davis@example.com', 'HR', 'HR Manager', 'EMP-003'),
('David', 'Wilson', 'david.wilson@example.com', 'Sales', 'Sales Representative', 'EMP-004');

-- Initialize program enrollments
INSERT INTO program_enrollment (program_id, program_name, enrollment_date, status, employee_id) VALUES
(1, 'Java Developer Bootcamp', '2025-05-15 10:00:00', 'ENROLLED', 1),
(1, 'Java Developer Bootcamp', '2025-05-15 11:30:00', 'ENROLLED', 2),
(2, 'Leadership Skills', '2025-05-16 09:45:00', 'ENROLLED', 3),
(3, 'Cloud Computing Essentials', '2025-05-17 14:20:00', 'ENROLLED', 1);

-- Initialize attendance records
INSERT INTO attendance (employee_id, session_id, employee_name, session_name, attendance_time, present, notes) VALUES
(1, 1, 'Alice Johnson', 'Java Basics', '2025-06-01 09:15:00', true, 'Arrived on time'),
(2, 1, 'Bob Smith', 'Java Basics', '2025-06-01 09:20:00', true, 'Arrived late'),
(3, 3, 'Carol Davis', 'Team Building Workshop', '2025-06-15 13:05:00', true, 'Active participation');

-- Initialize completion records
INSERT INTO completion (employee_id, program_id, employee_name, program_name, completion_date, score, status, certificate_url, completed_by) VALUES
(1, 1, 'Alice Johnson', 'Java Developer Bootcamp', '2025-07-01 15:30:00', 95.5, 'COMPLETE', 'https://example.com/certificates/alice-java', 'John Doe');

-- Initialize feedback records
INSERT INTO feedback (employee_id, program_id, employee_name, program_name, rating, comments, provided_by, feedback_date, type) VALUES
(1, 1, 'Alice Johnson', 'Java Developer Bootcamp', 5, 'Excellent course content and instructor', 'Alice Johnson', '2025-07-02 10:15:00', 'EMPLOYEE_TO_PROGRAM'),
(1, 1, 'Alice Johnson', 'Java Developer Bootcamp', 4, 'Good understanding of core concepts, needs more practice with advanced topics', 'John Doe', '2025-07-03 14:30:00', 'TRAINER_TO_EMPLOYEE');
