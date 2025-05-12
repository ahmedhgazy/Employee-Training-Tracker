# Software Design Document (SDD)
# Employee Training Tracker System

## 1. Introduction

### 1.1 Purpose
This Software Design Document (SDD) describes the architectural and detailed design of the Employee Training Tracker system. It provides technical details on how the system will be implemented to meet the requirements specified in the Software Requirements Specification (SRS).

### 1.2 Scope
This document covers the design of all components of the Employee Training Tracker system, including:
- Frontend React application
- Backend microservices (Training Program Service, Employee Service, Tracking Service)
- Service Discovery (Eureka Server)
- API Gateway
- Database design

### 1.3 Intended Audience
This document is intended for:
- Software developers implementing the system
- Quality assurance engineers testing the system
- System administrators deploying and maintaining the system
- Project managers overseeing development

### 1.4 References
- Software Requirements Specification (SRS) for Employee Training Tracker
- Spring Boot Documentation
- Spring Cloud Documentation
- React Documentation

## 2. System Architecture

### 2.1 Architectural Overview

The Employee Training Tracker system follows a microservices architecture with the following components:

1. **Frontend Layer**: A React-based Single Page Application (SPA)
2. **API Gateway**: Entry point for all client requests
3. **Service Discovery**: Eureka Server for service registration and discovery
4. **Microservices Layer**:
   - Training Program Service
   - Employee Service
   - Tracking Service
5. **Persistence Layer**: MySQL database

### 2.2 Architectural Diagram

```
┌─────────────────┐
│                 │
│  React Frontend │
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│                 │
│   API Gateway   │
│                 │
└────────┬────────┘
         │
┌────────┴────────┐
│                 │
│ Eureka Server   │
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│ │  Training   │    │             │    │             │  │
│ │  Program    │    │  Employee   │    │  Tracking   │  │
│ │  Service    │    │  Service    │    │  Service    │  │
│ └──────┬──────┘    └──────┬──────┘    └──────┬──────┘  │
│        │                  │                  │          │
└────────┼──────────────────┼──────────────────┼──────────┘
         │                  │                  │
         ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                   MySQL Database                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Component Interaction

- **Frontend to Backend**: The React frontend communicates with backend services through the API Gateway using RESTful APIs.
- **API Gateway to Microservices**: The API Gateway routes requests to appropriate microservices based on request paths.
- **Service Discovery**: All microservices register with Eureka Server for service discovery.
- **Microservices to Database**: Each microservice has its own data access layer to communicate with the MySQL database.
- **Inter-Service Communication**: Services communicate with each other through REST API calls when necessary.

## 3. Detailed Design

### 3.1 Frontend Design

#### 3.1.1 Component Structure
The React application follows a component-based architecture with the following structure:

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   └── Footer.js
│   ├── dashboard/
│   │   └── Dashboard.js
│   ├── training/
│   │   ├── ProgramList.js
│   │   ├── ProgramDetail.js
│   │   ├── ProgramForm.js
│   │   ├── SessionList.js
│   │   └── SessionForm.js
│   ├── employees/
│   │   ├── EmployeeList.js
│   │   ├── EmployeeDetail.js
│   │   ├── EmployeeForm.js
│   │   ├── EnrollmentList.js
│   │   └── EnrollmentForm.js
│   └── tracking/
│       ├── AttendanceList.js
│       ├── AttendanceForm.js
│       ├── CompletionList.js
│       ├── CompletionForm.js
│       ├── FeedbackList.js
│       └── FeedbackForm.js
├── services/
│   ├── trainingService.js
│   ├── employeeService.js
│   └── trackingService.js
├── utils/
│   ├── api.js
│   └── helpers.js
├── App.js
└── index.js
```

#### 3.1.2 Component Design Principles
- **Single Responsibility**: Each component focuses on a specific functionality.
- **Reusability**: Common UI elements are implemented as reusable components.
- **State Management**: Component state is managed using React hooks.
- **Form Management**: Forms are implemented using Formik with Yup for validation.
- **Responsive Design**: Bootstrap used for responsive layouts.

#### 3.1.3 Routing
React Router is used for client-side routing with the following main routes:
- `/` - Dashboard
- `/programs` - Training program listing
- `/programs/:id` - Program details
- `/programs/new` - Create new program
- `/programs/edit/:id` - Edit program
- `/sessions` - Training session listing
- `/sessions/:id` - Session details
- `/sessions/new` - Create new session
- `/sessions/edit/:id` - Edit session
- `/employees` - Employee listing
- `/employees/:id` - Employee details
- `/employees/new` - Create new employee
- `/employees/edit/:id` - Edit employee
- `/enrollments` - Enrollment listing
- `/enrollments/new` - Create new enrollment
- `/attendance` - Attendance listing
- `/attendance/new` - Record attendance
- `/completions` - Completion listing
- `/completions/new` - Record completion
- `/feedback` - Feedback listing
- `/feedback/new` - Provide feedback

#### 3.1.4 API Integration
The frontend communicates with backend services through service modules:
- `trainingService.js` - Handles API calls to the Training Program Service
- `employeeService.js` - Handles API calls to the Employee Service
- `trackingService.js` - Handles API calls to the Tracking Service

These services use Axios for HTTP requests and handle common functionality like error handling and response transformation.

### 3.2 Backend Design

#### 3.2.1 Microservices Structure
Each microservice follows a similar structure:

```
<service-name>/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── training/
│   │   │           └── <service_name>/
│   │   │               ├── controller/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               ├── service/
│   │   │               ├── exception/
│   │   │               ├── aop/
│   │   │               └── <ServiceName>Application.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── bootstrap.yml
```

#### 3.2.2 Common Design Patterns
- **Repository Pattern**: Used for data access abstraction
- **Service Layer Pattern**: Business logic encapsulated in service classes
- **Dependency Injection**: Spring IoC container used for dependency management
- **Aspect-Oriented Programming**: Used for cross-cutting concerns like logging and performance monitoring
- **DTO Pattern**: Used for data transfer between layers

#### 3.2.3 API Gateway
The API Gateway is implemented using Spring Cloud Gateway and provides:
- **Routing**: Routes requests to appropriate microservices
- **Load Balancing**: Client-side load balancing using Ribbon
- **CORS Configuration**: Handles Cross-Origin Resource Sharing
- **Authentication/Authorization**: Integrates with authentication service (future extension)

#### 3.2.4 Service Discovery
Eureka Server is used for service registration and discovery:
- **Service Registration**: Each microservice registers itself with Eureka Server
- **Service Discovery**: Microservices look up other services through Eureka Server
- **Health Checking**: Eureka Server monitors service health

### 3.3 Database Design

#### 3.3.1 Entity Relationship Diagram
The database schema consists of the following tables:
- `programs` - Stores training program information
- `sessions` - Stores training session information
- `employees` - Stores employee information
- `enrollments` - Maps employees to programs
- `attendance` - Tracks attendance for sessions
- `completions` - Records program completion for employees
- `feedback` - Stores feedback from employees and trainers

(Detailed ERD is provided in a separate file)

#### 3.3.2 Data Access Layer
Each microservice uses Spring Data JPA for database interaction:
- **Entities**: JPA entities map to database tables
- **Repositories**: Spring Data repositories provide CRUD operations
- **Transaction Management**: Spring's declarative transaction management

#### 3.3.3 Database Configuration
- **Database**: MySQL
- **Connection Pool**: HikariCP
- **Schema Management**: Hibernate with DDL auto-update for development

## 4. Technical Implementation Details

### 4.1 Training Program Service

#### 4.1.1 Core Components
- **Program Entity**: Represents a training program
- **Session Entity**: Represents a training session for a program
- **ProgramRepository & SessionRepository**: Data access interfaces
- **ProgramService & SessionService**: Business logic services
- **ProgramController & SessionController**: REST API controllers

#### 4.1.2 API Endpoints
- `GET /api/training/programs` - Get all programs
- `GET /api/training/programs/{id}` - Get program by ID
- `POST /api/training/programs` - Create a program
- `PUT /api/training/programs/{id}` - Update a program
- `DELETE /api/training/programs/{id}` - Delete a program
- `GET /api/training/sessions` - Get all sessions
- `GET /api/training/sessions/program/{programId}` - Get sessions by program ID
- `GET /api/training/sessions/{id}` - Get session by ID
- `POST /api/training/sessions` - Create a session
- `PUT /api/training/sessions/{id}` - Update a session
- `DELETE /api/training/sessions/{id}` - Delete a session

### 4.2 Employee Service

#### 4.2.1 Core Components
- **Employee Entity**: Represents an employee
- **Enrollment Entity**: Represents an employee's enrollment in a program
- **EmployeeRepository & EnrollmentRepository**: Data access interfaces
- **EmployeeService & EnrollmentService**: Business logic services
- **EmployeeController & EnrollmentController**: REST API controllers

#### 4.2.2 API Endpoints
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create an employee
- `PUT /api/employees/{id}` - Update an employee
- `DELETE /api/employees/{id}` - Delete an employee
- `GET /api/employees/enrollments/employee/{employeeId}` - Get enrollments for an employee
- `GET /api/employees/enrollments/program/{programId}` - Get enrollments for a program
- `POST /api/employees/enrollments/{employeeId}/program/{programId}` - Enroll employee to a program
- `PATCH /api/employees/enrollments/{enrollmentId}/status` - Update enrollment status

### 4.3 Tracking Service

#### 4.3.1 Core Components
- **Attendance Entity**: Represents attendance for a session
- **Completion Entity**: Represents program completion for an employee
- **Feedback Entity**: Represents feedback from employees or trainers
- **AttendanceRepository, CompletionRepository & FeedbackRepository**: Data access interfaces
- **TrackingService**: Business logic service
- **TrackingController**: REST API controller

#### 4.3.2 API Endpoints
- `GET /api/tracking/attendance` - Get all attendance records
- `GET /api/tracking/attendance/session/{sessionId}` - Get attendance by session ID
- `GET /api/tracking/attendance/employee/{employeeId}` - Get attendance by employee ID
- `POST /api/tracking/attendance` - Record attendance
- `GET /api/tracking/completions` - Get all completion records
- `GET /api/tracking/completions/employee/{employeeId}` - Get completions by employee ID
- `GET /api/tracking/completions/program/{programId}` - Get completions by program ID
- `POST /api/tracking/completions` - Record program completion
- `GET /api/tracking/feedback` - Get all feedback
- `GET /api/tracking/feedback/employee/{employeeId}` - Get feedback by employee ID
- `GET /api/tracking/feedback/program/{programId}` - Get feedback by program ID
- `POST /api/tracking/feedback` - Record feedback

### 4.4 Aspect-Oriented Programming (AOP)

#### 4.4.1 LoggingAspect
- **Before Advice**: Logs method entry with parameters
- **AfterReturning Advice**: Logs method return values
- **AfterThrowing Advice**: Logs exceptions
- **Around Advice**: Measures and logs method execution time

#### 4.4.2 Pointcuts
- **controllerMethods()**: Targets all controller methods
- **serviceMethods()**: Targets all service methods
- **repositoryMethods()**: Targets all repository methods

## 5. Deployment Considerations

### 5.1 System Requirements
- **Java**: JDK 17+
- **Node.js**: Version 16+
- **MySQL**: Version 8.0+
- **Maven**: Version 3.6+
- **NPM**: Version 8+

### 5.2 Deployment Architecture
- **Development**: Local deployment with Docker Compose
- **Production**: Cloud deployment (AWS/GCP/Azure) options

### 5.3 Configuration Management
- **Environment Variables**: Used for sensitive configuration
- **Application Properties**: Used for non-sensitive configuration
- **Spring Cloud Config**: Potential future extension for centralized configuration

### 5.4 Monitoring and Logging
- **Spring Boot Actuator**: Health checks and metrics
- **Logging**: Logback for logging, with potential ELK stack integration
- **Distributed Tracing**: Potential future extension with Spring Cloud Sleuth and Zipkin

## 6. Testing Strategy

### 6.1 Unit Testing
- **JUnit 5**: Testing framework
- **Mockito**: Mocking framework
- **Spring Boot Test**: Integration with Spring Boot

### 6.2 Integration Testing
- **Spring Boot Test**: Integration tests for API endpoints
- **Test Containers**: Database testing

### 6.3 Frontend Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing

### 6.4 Performance Testing
- **JMeter**: Load and performance testing

## 7. Security Considerations

### 7.1 Authentication and Authorization
- **JWT-based Authentication**: Potential implementation for securing APIs
- **Role-based Access Control**: Different roles for administrators, trainers, and employees

### 7.2 Data Protection
- **HTTPS**: Secure communication
- **Password Storage**: Secure password hashing
- **Data Validation**: Input validation to prevent injection attacks

### 7.3 API Security
- **Rate Limiting**: Protection against abuse
- **Request Validation**: Validation of incoming requests
- **CORS Configuration**: Controlled cross-origin resource sharing

## 8. Maintenance and Support

### 8.1 Documentation
- **API Documentation**: Swagger for API documentation
- **Code Documentation**: Javadoc for backend, JSDoc for frontend
- **User Documentation**: User manuals and guides

### 8.2 Version Control and CI/CD
- **Git**: Version control system
- **GitHub Actions**: Potential CI/CD pipeline
- **Maven**: Build automation for backend
- **NPM**: Build automation for frontend

### 8.3 Issue Tracking
- **JIRA/GitHub Issues**: Issue tracking and management

## 9. Future Enhancements

### 9.1 Potential Extensions
- **Authentication Service**: User management and authentication
- **Notification Service**: Email and in-app notifications
- **Reporting Service**: Advanced reporting and analytics
- **Mobile Application**: Native mobile app for improved accessibility
- **Integration with LMS**: Integration with Learning Management Systems

### 9.2 Scalability Improvements
- **Caching**: Redis for caching frequently accessed data
- **Message Queuing**: RabbitMQ/Kafka for asynchronous processing
- **Kubernetes**: Container orchestration for scalability
