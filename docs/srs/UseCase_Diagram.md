# Employee Training Tracker - Use Case Diagram

```
@startuml Training Tracker Use Case Diagram

' Define actors
actor "Administrator" as Admin
actor "Trainer" as Trainer
actor "Employee" as Employee

' Define system boundary
rectangle "Employee Training Tracker System" {
  ' Training Program Management
  usecase "Create Training Program" as UC1
  usecase "Update Training Program" as UC2
  usecase "View Training Program" as UC3
  usecase "Delete Training Program" as UC4
  usecase "Create Training Session" as UC5
  usecase "Update Training Session" as UC6
  usecase "View Training Session" as UC7
  usecase "Delete Training Session" as UC8
  
  ' Employee Management
  usecase "Register Employee" as UC9
  usecase "Update Employee Information" as UC10
  usecase "View Employee Details" as UC11
  usecase "Delete Employee" as UC12
  usecase "Enroll Employee in Program" as UC13
  usecase "View Enrollment Details" as UC14
  
  ' Attendance Tracking
  usecase "Record Attendance" as UC15
  usecase "View Attendance Records" as UC16
  usecase "Update Attendance Records" as UC17
  
  ' Completion Tracking
  usecase "Record Program Completion" as UC18
  usecase "View Completion Records" as UC19
  usecase "Generate Completion Reports" as UC20
  
  ' Feedback Management
  usecase "Provide Program Feedback" as UC21
  usecase "Provide Performance Feedback" as UC22
  usecase "View Feedback Records" as UC23
}

' Define relationships
' Administrator relationships
Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4
Admin --> UC5
Admin --> UC6
Admin --> UC7
Admin --> UC8
Admin --> UC9
Admin --> UC10
Admin --> UC11
Admin --> UC12
Admin --> UC13
Admin --> UC14
Admin --> UC20
Admin --> UC23

' Trainer relationships
Trainer --> UC3
Trainer --> UC7
Trainer --> UC11
Trainer --> UC14
Trainer --> UC15
Trainer --> UC16
Trainer --> UC17
Trainer --> UC18
Trainer --> UC19
Trainer --> UC22

' Employee relationships
Employee --> UC3
Employee --> UC7
Employee --> UC11
Employee --> UC14
Employee --> UC16
Employee --> UC19
Employee --> UC21

@enduml
```

## Description

This Use Case Diagram illustrates the interactions between the system's three main actors (Administrator, Trainer, and Employee) and the various use cases they can perform:

### Actors
1. **Administrator**: Responsible for setting up and managing the training ecosystem
2. **Trainer**: Responsible for conducting training sessions and evaluating employees
3. **Employee**: Participates in training programs and provides feedback

### Use Cases by Category

#### Training Program Management
- Create, update, view, and delete training programs
- Create, update, view, and delete training sessions

#### Employee Management
- Register, update, view, and delete employees
- Enroll employees in programs and view enrollment details

#### Attendance Tracking
- Record, view, and update attendance records

#### Completion Tracking
- Record and view program completions
- Generate completion reports

#### Feedback Management
- Provide program feedback (from employees)
- Provide performance feedback (from trainers)
- View feedback records

### Key Interactions
- Administrators have the most comprehensive access to the system
- Trainers focus on conducting sessions and evaluating employees
- Employees mainly consume information and provide feedback

This diagram provides a high-level overview of system functionality and user roles, forming the foundation for further system design and development.
