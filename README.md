# Employee Training Tracker System

A comprehensive microservices-based system for managing employee training programs, tracking attendance, and providing feedback.

## System Architecture

This application is built using a microservices architecture with the following components:

1. **Eureka Server** - Service discovery server (Port: 8761)
2. **API Gateway** - Single entry point for client requests (Port: 8080)
3. **Training Program Service** - Manages training programs and sessions (Port: 8081)
4. **Employee Service** - Manages employee data and training enrollments (Port: 8082)
5. **Tracking Service** - Tracks attendance, completion status, and feedback (Port: 8083)

## Features

- Create and manage training programs with multiple sessions
- Enroll employees to training programs
- Track attendance for training sessions
- Mark completion status for training programs
- Provide basic performance feedback
- AOP implementation for cross-cutting concerns like logging

## Technical Stack

- Java 17
- Spring Boot 3.4.4
- Spring Cloud (Eureka, API Gateway, OpenFeign)
- Spring Data JPA
- MySQL Database
- Lombok
- Spring AOP

## Prerequisites

- JDK 17
- Maven 3.8+
- MySQL 8.0+
- Git

## Getting Started

### Database Setup

1. Install and configure MySQL.
2. Create a database named `training_tracker`:
   ```sql
   CREATE DATABASE training_tracker;
   ```
3. Configure the database user. The default configuration uses:
   - Username: `root`
   - Password: `ahmedP@ssW0rd0000`

4. Run the database initialization script:
   ```
   mysql -u root -p < database_init.sql
   ```

### Building and Running the Services

For each service, follow these steps:

1. Build the service:
   ```
   mvn clean package
   ```

2. Run the service:
   ```
   java -jar target/<service-name>-0.0.1-SNAPSHOT.jar
   ```

### Start the Services in Order

1. Start the Eureka Server first:
   ```
   cd eureka-server
   mvn spring-boot:run
   ```

2. Start the other services in any order:
   ```
   cd ../training-program-service
   mvn spring-boot:run
   ```
   
   ```
   cd ../employee-service
   mvn spring-boot:run
   ```
   
   ```
   cd ../tracking-service
   mvn spring-boot:run
   ```
   
   ```
   cd ../api-gateway
   mvn spring-boot:run
   ```

## API Endpoints

### Training Program Service

- **GET /api/training/programs** - Get all training programs
- **GET /api/training/programs/{id}** - Get a specific program
- **POST /api/training/programs** - Create a new program
- **PUT /api/training/programs/{id}** - Update a program
- **DELETE /api/training/programs/{id}** - Delete a program
- **GET /api/training/sessions** - Get all sessions
- **GET /api/training/sessions/{id}** - Get a specific session
- **POST /api/training/sessions/program/{programId}** - Create a session in a program
- **PUT /api/training/sessions/{id}** - Update a session
- **DELETE /api/training/sessions/{id}** - Delete a session

### Employee Service

- **GET /api/employees** - Get all employees
- **GET /api/employees/{id}** - Get a specific employee
- **POST /api/employees** - Create a new employee
- **PUT /api/employees/{id}** - Update an employee
- **DELETE /api/employees/{id}** - Delete an employee
- **GET /api/employees/enrollments/employee/{employeeId}** - Get enrollments for an employee
- **POST /api/employees/enrollments/{employeeId}/program/{programId}** - Enroll employee to a program
- **PATCH /api/employees/enrollments/{enrollmentId}/status** - Update enrollment status

### Tracking Service

- **GET /api/tracking/attendance** - Get all attendance records
- **POST /api/tracking/attendance** - Record attendance
- **GET /api/tracking/completions** - Get all completion records
- **POST /api/tracking/completions** - Record program completion
- **GET /api/tracking/feedback** - Get all feedback
- **POST /api/tracking/feedback** - Record feedback

## Aspect-Oriented Programming (AOP)

This project implements AOP for cross-cutting concerns:

- **Logging**: Logs method calls, return values, and exceptions
- **Performance Monitoring**: Tracks execution time of methods
- **Exception Handling**: Centralized exception logging

## License

This project is licensed under the MIT License - see the LICENSE file for details.
