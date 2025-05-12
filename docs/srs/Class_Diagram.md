# Employee Training Tracker - Class Diagram

```
@startuml Class Diagram

' Training Program Service
package "com.training.training_program_service" {
  class Program {
    - id: Long
    - name: String
    - description: String
    - category: String
    - durationHours: Integer
    - objectives: String
    - status: ProgramStatus
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getName(): String
    + getDescription(): String
    + getCategory(): String
    + getDurationHours(): Integer
    + getObjectives(): String
    + getStatus(): ProgramStatus
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setName(name: String): void
    + setDescription(description: String): void
    + setCategory(category: String): void
    + setDurationHours(durationHours: Integer): void
    + setObjectives(objectives: String): void
    + setStatus(status: ProgramStatus): void
  }
  
  class Session {
    - id: Long
    - programId: Long
    - name: String
    - startDate: LocalDate
    - endDate: LocalDate
    - location: String
    - maxParticipants: Integer
    - trainer: String
    - status: SessionStatus
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getProgramId(): Long
    + getName(): String
    + getStartDate(): LocalDate
    + getEndDate(): LocalDate
    + getLocation(): String
    + getMaxParticipants(): Integer
    + getTrainer(): String
    + getStatus(): SessionStatus
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setProgramId(programId: Long): void
    + setName(name: String): void
    + setStartDate(startDate: LocalDate): void
    + setEndDate(endDate: LocalDate): void
    + setLocation(location: String): void
    + setMaxParticipants(maxParticipants: Integer): void
    + setTrainer(trainer: String): void
    + setStatus(status: SessionStatus): void
  }
  
  enum ProgramStatus {
    DRAFT
    ACTIVE
    COMPLETED
    ARCHIVED
  }
  
  enum SessionStatus {
    SCHEDULED
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }
  
  interface ProgramService {
    + getAllPrograms(): List<Program>
    + getProgramById(id: Long): Program
    + saveProgram(program: Program): Program
    + deleteProgram(id: Long): void
    + getAllSessions(): List<Session>
    + getSessionsByProgramId(programId: Long): List<Session>
    + getSessionById(id: Long): Session
    + saveSession(session: Session): Session
    + deleteSession(id: Long): void
  }
  
  class ProgramController {
    - programService: ProgramService
    + getAllPrograms(): ResponseEntity<List<Program>>
    + getProgramById(id: Long): ResponseEntity<Program>
    + createProgram(program: Program): ResponseEntity<Program>
    + updateProgram(id: Long, program: Program): ResponseEntity<Program>
    + deleteProgram(id: Long): ResponseEntity<Void>
    + getAllSessions(): ResponseEntity<List<Session>>
    + getSessionsByProgramId(programId: Long): ResponseEntity<List<Session>>
    + getSessionById(id: Long): ResponseEntity<Session>
    + createSession(session: Session): ResponseEntity<Session>
    + updateSession(id: Long, session: Session): ResponseEntity<Session>
    + deleteSession(id: Long): ResponseEntity<Void>
  }
  
  Program -- ProgramStatus
  Session -- SessionStatus
  Session --o Program
  ProgramController --> ProgramService
}

' Employee Service
package "com.training.employee_service" {
  class Employee {
    - id: Long
    - employeeId: String
    - firstName: String
    - lastName: String
    - email: String
    - department: String
    - position: String
    - joiningDate: LocalDate
    - status: EmployeeStatus
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getEmployeeId(): String
    + getFirstName(): String
    + getLastName(): String
    + getEmail(): String
    + getDepartment(): String
    + getPosition(): String
    + getJoiningDate(): LocalDate
    + getStatus(): EmployeeStatus
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setEmployeeId(employeeId: String): void
    + setFirstName(firstName: String): void
    + setLastName(lastName: String): void
    + setEmail(email: String): void
    + setDepartment(department: String): void
    + setPosition(position: String): void
    + setJoiningDate(joiningDate: LocalDate): void
    + setStatus(status: EmployeeStatus): void
  }
  
  class Enrollment {
    - id: Long
    - employeeId: Long
    - programId: Long
    - enrollmentDate: LocalDate
    - status: EnrollmentStatus
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getEmployeeId(): Long
    + getProgramId(): Long
    + getEnrollmentDate(): LocalDate
    + getStatus(): EnrollmentStatus
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setEmployeeId(employeeId: Long): void
    + setProgramId(programId: Long): void
    + setEnrollmentDate(enrollmentDate: LocalDate): void
    + setStatus(status: EnrollmentStatus): void
  }
  
  enum EmployeeStatus {
    ACTIVE
    INACTIVE
    ON_LEAVE
    TERMINATED
  }
  
  enum EnrollmentStatus {
    ENROLLED
    IN_PROGRESS
    COMPLETED
    WITHDRAWN
  }
  
  interface EmployeeService {
    + getAllEmployees(): List<Employee>
    + getEmployeeById(id: Long): Employee
    + saveEmployee(employee: Employee): Employee
    + deleteEmployee(id: Long): void
    + getEnrollmentsByEmployeeId(employeeId: Long): List<Enrollment>
    + getEnrollmentsByProgramId(programId: Long): List<Enrollment>
    + saveEnrollment(enrollment: Enrollment): Enrollment
    + updateEnrollmentStatus(id: Long, status: EnrollmentStatus): Enrollment
  }
  
  class EmployeeController {
    - employeeService: EmployeeService
    + getAllEmployees(): ResponseEntity<List<Employee>>
    + getEmployeeById(id: Long): ResponseEntity<Employee>
    + createEmployee(employee: Employee): ResponseEntity<Employee>
    + updateEmployee(id: Long, employee: Employee): ResponseEntity<Employee>
    + deleteEmployee(id: Long): ResponseEntity<Void>
    + getEnrollmentsByEmployeeId(employeeId: Long): ResponseEntity<List<Enrollment>>
    + getEnrollmentsByProgramId(programId: Long): ResponseEntity<List<Enrollment>>
    + enrollEmployeeToProgram(employeeId: Long, programId: Long): ResponseEntity<Enrollment>
    + updateEnrollmentStatus(enrollmentId: Long, status: EnrollmentStatus): ResponseEntity<Enrollment>
  }
  
  Employee -- EmployeeStatus
  Enrollment -- EnrollmentStatus
  EmployeeController --> EmployeeService
}

' Tracking Service
package "com.training.tracking_service" {
  class Attendance {
    - id: Long
    - sessionId: Long
    - employeeId: Long
    - attendanceDate: LocalDate
    - status: AttendanceStatus
    - comments: String
    - createdBy: String
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getSessionId(): Long
    + getEmployeeId(): Long
    + getAttendanceDate(): LocalDate
    + getStatus(): AttendanceStatus
    + getComments(): String
    + getCreatedBy(): String
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setSessionId(sessionId: Long): void
    + setEmployeeId(employeeId: Long): void
    + setAttendanceDate(attendanceDate: LocalDate): void
    + setStatus(status: AttendanceStatus): void
    + setComments(comments: String): void
    + setCreatedBy(createdBy: String): void
  }
  
  class Completion {
    - id: Long
    - employeeId: Long
    - programId: Long
    - completionDate: LocalDate
    - score: Double
    - status: CompletionStatus
    - certificate: String
    - comments: String
    - createdBy: String
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getEmployeeId(): Long
    + getProgramId(): Long
    + getCompletionDate(): LocalDate
    + getScore(): Double
    + getStatus(): CompletionStatus
    + getCertificate(): String
    + getComments(): String
    + getCreatedBy(): String
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setEmployeeId(employeeId: Long): void
    + setProgramId(programId: Long): void
    + setCompletionDate(completionDate: LocalDate): void
    + setScore(score: Double): void
    + setStatus(status: CompletionStatus): void
    + setCertificate(certificate: String): void
    + setComments(comments: String): void
    + setCreatedBy(createdBy: String): void
  }
  
  class Feedback {
    - id: Long
    - employeeId: Long
    - programId: Long
    - rating: Integer
    - comments: String
    - feedbackDate: LocalDate
    - type: FeedbackType
    - providedBy: String
    - createdAt: LocalDateTime
    - updatedAt: LocalDateTime
    + getId(): Long
    + getEmployeeId(): Long
    + getProgramId(): Long
    + getRating(): Integer
    + getComments(): String
    + getFeedbackDate(): LocalDate
    + getType(): FeedbackType
    + getProvidedBy(): String
    + getCreatedAt(): LocalDateTime
    + getUpdatedAt(): LocalDateTime
    + setEmployeeId(employeeId: Long): void
    + setProgramId(programId: Long): void
    + setRating(rating: Integer): void
    + setComments(comments: String): void
    + setFeedbackDate(feedbackDate: LocalDate): void
    + setType(type: FeedbackType): void
    + setProvidedBy(providedBy: String): void
  }
  
  enum AttendanceStatus {
    PRESENT
    ABSENT
    LATE
    EXCUSED
  }
  
  enum CompletionStatus {
    COMPLETED
    FAILED
    INCOMPLETE
  }
  
  enum FeedbackType {
    EMPLOYEE_TO_PROGRAM
    TRAINER_TO_EMPLOYEE
  }
  
  interface TrackingService {
    + getAllAttendance(): List<Attendance>
    + getAttendanceBySessionId(sessionId: Long): List<Attendance>
    + getAttendanceByEmployeeId(employeeId: Long): List<Attendance>
    + saveAttendance(attendance: Attendance): Attendance
    + getAllCompletions(): List<Completion>
    + getCompletionsByEmployeeId(employeeId: Long): List<Completion>
    + getCompletionsByProgramId(programId: Long): List<Completion>
    + saveCompletion(completion: Completion): Completion
    + getAllFeedback(): List<Feedback>
    + getFeedbackByEmployeeId(employeeId: Long): List<Feedback>
    + getFeedbackByProgramId(programId: Long): List<Feedback>
    + saveFeedback(feedback: Feedback): Feedback
  }
  
  class TrackingController {
    - trackingService: TrackingService
    + getAllAttendance(): ResponseEntity<List<Attendance>>
    + getAttendanceBySessionId(sessionId: Long): ResponseEntity<List<Attendance>>
    + getAttendanceByEmployeeId(employeeId: Long): ResponseEntity<List<Attendance>>
    + recordAttendance(attendance: Attendance): ResponseEntity<Attendance>
    + getAllCompletions(): ResponseEntity<List<Completion>>
    + getCompletionsByEmployeeId(employeeId: Long): ResponseEntity<List<Completion>>
    + getCompletionsByProgramId(programId: Long): ResponseEntity<List<Completion>>
    + recordCompletion(completion: Completion): ResponseEntity<Completion>
    + getAllFeedback(): ResponseEntity<List<Feedback>>
    + getFeedbackByEmployeeId(employeeId: Long): ResponseEntity<List<Feedback>>
    + getFeedbackByProgramId(programId: Long): ResponseEntity<List<Feedback>>
    + recordFeedback(feedback: Feedback): ResponseEntity<Feedback>
  }
  
  Attendance -- AttendanceStatus
  Completion -- CompletionStatus
  Feedback -- FeedbackType
  TrackingController --> TrackingService
}

' AOP
package "com.training.aop" {
  class LoggingAspect {
    - log: Logger
    + logBefore(joinPoint: JoinPoint): void
    + logAfterReturning(joinPoint: JoinPoint, result: Object): void
    + logAfterThrowing(joinPoint: JoinPoint, exception: Throwable): void
    + logExecutionTime(joinPoint: ProceedingJoinPoint): Object
  }
}

' Relationships between services
Enrollment --> Employee
Enrollment --> "Program" : references
Attendance --> Employee : references
Attendance --> Session : references
Completion --> Employee : references
Completion --> "Program" : references
Feedback --> Employee : references
Feedback --> "Program" : references

@enduml
```

## Description

This Class Diagram illustrates the structure of the Employee Training Tracker system, organized by its microservices architecture:

### Training Program Service
- **Program**: Represents a training program with its details
- **Session**: Represents a specific training session for a program
- **ProgramStatus & SessionStatus**: Enumerations for tracking the state of programs and sessions
- **ProgramService**: Interface defining operations for managing programs and sessions
- **ProgramController**: REST controller exposing API endpoints for program and session management

### Employee Service
- **Employee**: Represents an employee with personal and employment details
- **Enrollment**: Represents an employee's enrollment in a training program
- **EmployeeStatus & EnrollmentStatus**: Enumerations for tracking employee and enrollment states
- **EmployeeService**: Interface defining operations for managing employees and enrollments
- **EmployeeController**: REST controller exposing API endpoints for employee and enrollment management

### Tracking Service
- **Attendance**: Tracks employee attendance for specific training sessions
- **Completion**: Records the completion status of training programs for employees
- **Feedback**: Stores feedback from employees about programs or from trainers about employees
- **AttendanceStatus, CompletionStatus & FeedbackType**: Enumerations for tracking states and types
- **TrackingService**: Interface defining operations for tracking attendance, completions, and feedback
- **TrackingController**: REST controller exposing API endpoints for tracking-related operations

### AOP Component
- **LoggingAspect**: Implements cross-cutting concerns like logging and performance monitoring

### Key Relationships
- Enrollment connects Employees to Programs
- Attendance connects Employees to Sessions
- Completions connect Employees to Programs
- Feedback can be about Programs or Employees

This diagram shows the separation of concerns across microservices while illustrating how entities relate to each other in this distributed system.
