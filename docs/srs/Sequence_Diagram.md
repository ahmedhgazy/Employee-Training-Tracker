# Employee Training Tracker - Sequence Diagrams

## 1. Create Training Program Sequence Diagram

```
@startuml Create Training Program

actor "Administrator" as Admin
boundary "Frontend UI" as UI
control "API Gateway" as Gateway
participant "Training Program Service" as ProgramService
database "Database" as DB

Admin -> UI: Navigate to Training Programs
Admin -> UI: Click "Create New Program"
UI -> UI: Display program form
Admin -> UI: Enter program details
Admin -> UI: Click "Save"
UI -> UI: Validate input

alt Validation successful
    UI -> Gateway: POST /api/training/programs
    Gateway -> ProgramService: createProgram(program)
    ProgramService -> ProgramService: Validate program
    ProgramService -> DB: Save program
    DB --> ProgramService: Return saved program ID
    ProgramService --> Gateway: Return program details
    Gateway --> UI: Return program details
    UI -> UI: Display success message
    UI -> UI: Redirect to program details
else Validation failed
    UI -> UI: Display validation errors
end

@enduml
```

## 2. Enroll Employee in Program Sequence Diagram

```
@startuml Enroll Employee in Program

actor "Administrator" as Admin
boundary "Frontend UI" as UI
control "API Gateway" as Gateway
participant "Employee Service" as EmpService
participant "Training Program Service" as ProgramService
database "Database" as DB

Admin -> UI: Navigate to Employee Details
UI -> Gateway: GET /api/employees/{id}
Gateway -> EmpService: getEmployeeById(id)
EmpService -> DB: Query employee
DB --> EmpService: Return employee data
EmpService --> Gateway: Return employee data
Gateway --> UI: Return employee data
UI -> UI: Display employee details

Admin -> UI: Click "Enroll in Program"
UI -> Gateway: GET /api/training/programs
Gateway -> ProgramService: getAllPrograms()
ProgramService -> DB: Query programs
DB --> ProgramService: Return programs
ProgramService --> Gateway: Return programs
Gateway --> UI: Return programs
UI -> UI: Display available programs

Admin -> UI: Select program and enter details
Admin -> UI: Click "Save Enrollment"
UI -> UI: Validate enrollment data

alt Validation successful
    UI -> Gateway: POST /api/employees/enrollments/{employeeId}/program/{programId}
    Gateway -> EmpService: enrollEmployeeToProgram(employeeId, programId, enrollmentData)
    EmpService -> DB: Check existing enrollment
    
    alt Employee already enrolled
        DB --> EmpService: Return existing enrollment
        EmpService --> Gateway: Return error
        Gateway --> UI: Return error
        UI -> UI: Display error message
    else Employee not yet enrolled
        EmpService -> DB: Save enrollment
        DB --> EmpService: Return enrollment ID
        EmpService --> Gateway: Return enrollment data
        Gateway --> UI: Return enrollment data
        UI -> UI: Display success message
        UI -> UI: Update enrollment list
    end
    
else Validation failed
    UI -> UI: Display validation errors
end

@enduml
```

## 3. Record Attendance Sequence Diagram

```
@startuml Record Attendance

actor "Trainer" as Trainer
boundary "Frontend UI" as UI
control "API Gateway" as Gateway
participant "Training Program Service" as ProgramService
participant "Tracking Service" as TrackingService
database "Database" as DB

Trainer -> UI: Navigate to Sessions
UI -> Gateway: GET /api/training/sessions
Gateway -> ProgramService: getAllSessions()
ProgramService -> DB: Query sessions
DB --> ProgramService: Return sessions
ProgramService --> Gateway: Return sessions
Gateway --> UI: Return sessions
UI -> UI: Display sessions

Trainer -> UI: Select a session
UI -> Gateway: GET /api/training/sessions/{id}/enrollments
Gateway -> ProgramService: getSessionEnrollments(id)
ProgramService -> DB: Query enrollments
DB --> ProgramService: Return enrollments
ProgramService --> Gateway: Return enrollments
Gateway --> UI: Return enrollments
UI -> UI: Display enrolled employees

Trainer -> UI: Mark attendance for each employee
Trainer -> UI: Click "Save Attendance"
UI -> UI: Validate attendance data

alt Validation successful
    UI -> Gateway: POST /api/tracking/attendance
    Gateway -> TrackingService: recordAttendance(attendanceData)
    TrackingService -> TrackingService: Validate attendance
    TrackingService -> DB: Save attendance records
    DB --> TrackingService: Return confirmation
    TrackingService --> Gateway: Return success
    Gateway --> UI: Return success
    UI -> UI: Display success message
else Validation failed
    UI -> UI: Display validation errors
end

@enduml
```

## 4. Record Program Completion Sequence Diagram

```
@startuml Record Program Completion

actor "Trainer" as Trainer
boundary "Frontend UI" as UI
control "API Gateway" as Gateway
participant "Employee Service" as EmpService
participant "Tracking Service" as TrackingService
database "Database" as DB

Trainer -> UI: Navigate to Program Enrollments
UI -> Gateway: GET /api/employees/enrollments/program/{programId}
Gateway -> EmpService: getProgramEnrollments(programId)
EmpService -> DB: Query enrollments
DB --> EmpService: Return enrollments
EmpService --> Gateway: Return enrollments
Gateway --> UI: Return enrollments
UI -> UI: Display enrolled employees

Trainer -> UI: Select an employee
Trainer -> UI: Click "Record Completion"
UI -> UI: Display completion form
Trainer -> UI: Enter completion details
Trainer -> UI: Click "Save"
UI -> UI: Validate completion data

alt Validation successful
    UI -> Gateway: POST /api/tracking/completions
    Gateway -> TrackingService: recordCompletion(completionData)
    TrackingService -> TrackingService: Validate completion data
    TrackingService -> DB: Save completion record
    DB --> TrackingService: Return confirmation
    TrackingService --> Gateway: Return success
    Gateway --> UI: Return success
    UI -> UI: Display success message
else Validation failed
    UI -> UI: Display validation errors
end

@enduml
```

## 5. Submit Feedback Sequence Diagram

```
@startuml Submit Feedback

actor "User" as User
boundary "Frontend UI" as UI
control "API Gateway" as Gateway
participant "Tracking Service" as TrackingService
database "Database" as DB

User -> UI: Navigate to feedback section
alt Employee feedback
    UI -> Gateway: GET /api/training/programs/{id}
    Gateway -> TrackingService: getProgram(id)
    TrackingService -> DB: Query program
    DB --> TrackingService: Return program data
    TrackingService --> Gateway: Return program data
    Gateway --> UI: Return program data
    UI -> UI: Display program feedback form
else Trainer feedback
    UI -> Gateway: GET /api/employees/{id}
    Gateway -> TrackingService: getEmployee(id)
    TrackingService -> DB: Query employee
    DB --> TrackingService: Return employee data
    TrackingService --> Gateway: Return employee data
    Gateway --> UI: Return employee data
    UI -> UI: Display employee feedback form
end

User -> UI: Enter feedback details
User -> UI: Click "Submit Feedback"
UI -> UI: Validate feedback data

alt Validation successful
    UI -> Gateway: POST /api/tracking/feedback
    Gateway -> TrackingService: recordFeedback(feedbackData)
    TrackingService -> TrackingService: Validate feedback
    TrackingService -> DB: Save feedback
    DB --> TrackingService: Return confirmation
    TrackingService --> Gateway: Return success
    Gateway --> UI: Return success
    UI -> UI: Display success message
else Validation failed
    UI -> UI: Display validation errors
end

@enduml
```

## Description

These Sequence Diagrams illustrate the interactions between actors, components, and services for key operations in the Employee Training Tracker system:

1. **Create Training Program**: Shows the sequence of interactions when an administrator creates a new training program
2. **Enroll Employee in Program**: Illustrates the process and interactions involved in enrolling an employee in a training program
3. **Record Attendance**: Depicts the sequence for recording attendance for a training session
4. **Record Program Completion**: Shows the interactions for recording the completion of a training program by an employee
5. **Submit Feedback**: Illustrates the different paths for submitting feedback, either by an employee on a program or by a trainer on an employee

Each diagram shows the flow of requests and responses between the user interface, API Gateway, microservices, and the database, highlighting the distributed nature of the system's architecture and the separation of concerns across different services.
