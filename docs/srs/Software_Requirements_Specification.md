# Software Requirements Specification (SRS)
# Employee Training Tracker System

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the Employee Training Tracker system, a microservices-based application designed to manage and track employee training programs, enrollments, attendance, and completion status.

### 1.2 Scope
The Employee Training Tracker system is designed to help organizations effectively manage their training programs, track employee progress, and gather feedback. It enables administrators to create training programs, enroll employees, monitor attendance, and assess performance.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **API**: Application Programming Interface
- **UI**: User Interface
- **CRUD**: Create, Read, Update, Delete
- **REST**: Representational State Transfer

### 1.4 System Overview
The system consists of:
1. **Frontend**: React-based web application
2. **Backend Microservices**:
   - Eureka Server (Service Discovery)
   - API Gateway (Entry point for clients)
   - Training Program Service
   - Employee Service
   - Tracking Service

## 2. Functional Requirements

### 2.1 Training Program Management
- FR-1.1: The system shall enable administrators to create training programs.
- FR-1.2: The system shall enable administrators to update existing training programs.
- FR-1.3: The system shall enable administrators to view training program details.
- FR-1.4: The system shall enable administrators to delete training programs.
- FR-1.5: The system shall enable administrators to create training sessions for programs.
- FR-1.6: The system shall enable administrators to update training sessions.
- FR-1.7: The system shall enable administrators to view training session details.
- FR-1.8: The system shall enable administrators to delete training sessions.

### 2.2 Employee Management
- FR-2.1: The system shall enable administrators to register employees.
- FR-2.2: The system shall enable administrators to update employee information.
- FR-2.3: The system shall enable administrators to view employee details.
- FR-2.4: The system shall enable administrators to delete employees.
- FR-2.5: The system shall enable administrators to enroll employees in training programs.
- FR-2.6: The system shall enable administrators to view enrollment details.

### 2.3 Attendance Tracking
- FR-3.1: The system shall enable trainers to record attendance for training sessions.
- FR-3.2: The system shall enable trainers to view attendance records.
- FR-3.3: The system shall enable trainers to update attendance records.

### 2.4 Completion Tracking
- FR-4.1: The system shall enable trainers to record program completion status for employees.
- FR-4.2: The system shall enable trainers to view completion records.
- FR-4.3: The system shall enable administrators to generate completion reports.

### 2.5 Feedback Management
- FR-5.1: The system shall enable employees to provide feedback on training programs.
- FR-5.2: The system shall enable trainers to provide feedback on employee performance.
- FR-5.3: The system shall enable administrators to view feedback records.

## 3. Non-Functional Requirements

### 3.1 Performance
- NFR-1.1: The system shall respond to user requests within 3 seconds under normal load.
- NFR-1.2: The system shall support up to 100 concurrent users.

### 3.2 Security
- NFR-2.1: The system shall authenticate users before allowing access to sensitive data.
- NFR-2.2: The system shall encrypt all sensitive data.

### 3.3 Reliability
- NFR-3.1: The system shall be available 99.9% of the time.
- NFR-3.2: The system shall recover from failures within 5 minutes.

### 3.4 Usability
- NFR-4.1: The system shall have a user-friendly interface that requires minimal training.
- NFR-4.2: The system shall provide clear error messages.

### 3.5 Maintainability
- NFR-5.1: The system shall follow a microservices architecture for easy maintenance.
- NFR-5.2: The system shall implement Aspect-Oriented Programming (AOP) for cross-cutting concerns.

## 4. Use Cases

### 4.1 Actors
- **Administrator**: Manages training programs, employees, and enrollments
- **Trainer**: Records attendance, completions, and provides feedback
- **Employee**: Participates in training programs and provides feedback

### 4.2 Use Case Descriptions

#### UC-1: Create Training Program
**Actor**: Administrator
**Description**: Administrator creates a new training program with details like name, description, category, and duration.
**Preconditions**: Administrator is logged in.
**Main Flow**:
1. Administrator selects "Create Training Program" option.
2. System displays a form for program details.
3. Administrator enters program details.
4. System validates the input.
5. System saves the program and displays a success message.
**Alternative Flows**:
- If validation fails, system displays error messages.
**Postconditions**: A new training program is created in the system.

#### UC-2: Enroll Employee in Program
**Actor**: Administrator
**Description**: Administrator enrolls an employee in a training program.
**Preconditions**: Administrator is logged in, employee and training program exist in the system.
**Main Flow**:
1. Administrator selects an employee.
2. Administrator selects "Enroll in Program" option.
3. System displays available programs.
4. Administrator selects a program.
5. System confirms enrollment.
**Alternative Flows**:
- If employee is already enrolled, system displays a message.
**Postconditions**: Employee is enrolled in the program.

#### UC-3: Record Attendance
**Actor**: Trainer
**Description**: Trainer records attendance for a training session.
**Preconditions**: Trainer is logged in, training session exists, employees are enrolled.
**Main Flow**:
1. Trainer selects a training session.
2. System displays a list of enrolled employees.
3. Trainer marks attendance for each employee.
4. System saves the attendance records.
**Alternative Flows**:
- If attendance is already recorded, system allows updates.
**Postconditions**: Attendance is recorded in the system.

#### UC-4: Record Program Completion
**Actor**: Trainer
**Description**: Trainer records completion status for an employee.
**Preconditions**: Trainer is logged in, employee is enrolled in a program.
**Main Flow**:
1. Trainer selects a program.
2. System displays enrolled employees.
3. Trainer selects an employee and marks completion status.
4. System records the completion.
**Alternative Flows**:
- If completion is already recorded, system allows updates.
**Postconditions**: Completion status is recorded in the system.

#### UC-5: Provide Feedback
**Actor**: Employee/Trainer
**Description**: Employee provides feedback on a program, or trainer provides feedback on employee performance.
**Preconditions**: User is logged in, program or enrollment exists.
**Main Flow**:
1. User selects "Provide Feedback" option.
2. System displays a feedback form.
3. User submits feedback.
4. System saves the feedback.
**Alternative Flows**:
- If feedback is already provided, system allows updates.
**Postconditions**: Feedback is recorded in the system.

## 5. System Architecture

### 5.1 Frontend
- React.js application with responsive design
- Components for training programs, employees, attendance, completions, and feedback

### 5.2 Backend
- **Eureka Server**: Service discovery for microservices
- **API Gateway**: Entry point for client requests
- **Training Program Service**: Manages training programs and sessions
- **Employee Service**: Manages employees and enrollments
- **Tracking Service**: Manages attendance, completions, and feedback

### 5.3 Database
- MySQL database with tables for programs, sessions, employees, enrollments, attendance, completions, and feedback

## 6. External Interfaces

### 6.1 User Interfaces
- Web-based interface accessible via standard browsers
- Responsive design for different screen sizes
- Bootstrap for consistent styling

### 6.2 API Interfaces
- RESTful APIs for all operations
- JSON format for data exchange
- Swagger documentation for API endpoints

## 7. Diagrams

(The actual diagrams will be provided in separate files. Please refer to them for visual representations of the system.)
