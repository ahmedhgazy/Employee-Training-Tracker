# Object Constraint Language (OCL) Constraints
# Employee Training Tracker System

## 1. Introduction

This document specifies the Object Constraint Language (OCL) constraints for the Employee Training Tracker system. These constraints define rules and conditions that must be satisfied by the system's classes and objects to maintain data integrity and business logic. As per your requirement, these constraints are documented but not implemented directly in the code.

## 2. OCL Constraints by Entity

### 2.1 Program Entity

#### 2.1.1 Name and Description Constraints
```
context Program
inv validName: self.name->notEmpty() and self.name.size() <= 255
inv validDescription: self.description->notEmpty()
```

#### 2.1.2 Duration Constraints
```
context Program
inv validDuration: self.durationHours > 0 and self.durationHours <= 1000
```

#### 2.1.3 Status Transition Constraints
```
context Program::setStatus(newStatus: ProgramStatus)
pre: 
  if self.status = ProgramStatus::DRAFT then
    newStatus = ProgramStatus::ACTIVE or 
    newStatus = ProgramStatus::ARCHIVED
  else if self.status = ProgramStatus::ACTIVE then
    newStatus = ProgramStatus::COMPLETED or 
    newStatus = ProgramStatus::ARCHIVED
  else if self.status = ProgramStatus::COMPLETED then
    newStatus = ProgramStatus::ARCHIVED
  else
    true
  endif
```

### 2.2 Session Entity

#### 2.2.1 Date Constraints
```
context Session
inv validDates: self.startDate <= self.endDate
inv futureDates: if self.status = SessionStatus::SCHEDULED then
                   self.startDate >= today()
                 else
                   true
                 endif
```

#### 2.2.2 Participants Constraint
```
context Session
inv validParticipants: self.maxParticipants > 0
```

#### 2.2.3 Session-Program Relationship
```
context Session
inv validProgramStatus: self.program.status = ProgramStatus::ACTIVE or
                       self.program.status = ProgramStatus::DRAFT
```

#### 2.2.4 Status Transition Constraints
```
context Session::setStatus(newStatus: SessionStatus)
pre:
  if self.status = SessionStatus::SCHEDULED then
    newStatus = SessionStatus::IN_PROGRESS or
    newStatus = SessionStatus::CANCELLED
  else if self.status = SessionStatus::IN_PROGRESS then
    newStatus = SessionStatus::COMPLETED or
    newStatus = SessionStatus::CANCELLED
  else
    false
  endif
```

### 2.3 Employee Entity

#### 2.3.1 Email Constraint
```
context Employee
inv validEmail: self.email->notEmpty() and 
               self.email.matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
```

#### 2.3.2 Name Constraints
```
context Employee
inv validNames: self.firstName->notEmpty() and 
               self.lastName->notEmpty() and
               self.firstName.size() <= 100 and
               self.lastName.size() <= 100
```

#### 2.3.3 Employee ID Uniqueness
```
context Employee
inv uniqueEmployeeId: Employee.allInstances()->forAll(e1, e2 | 
                     e1 <> e2 implies e1.employeeId <> e2.employeeId)
```

#### 2.3.4 Joining Date Constraint
```
context Employee
inv validJoiningDate: self.joiningDate <= today()
```

### 2.4 Enrollment Entity

#### 2.4.1 Enrollment Date Constraint
```
context Enrollment
inv validEnrollmentDate: self.enrollmentDate <= today()
```

#### 2.4.2 Unique Employee-Program Enrollment
```
context Enrollment
inv uniqueEnrollment: Enrollment.allInstances()->forAll(e1, e2 | 
                     e1 <> e2 implies not (e1.employeeId = e2.employeeId and 
                                          e1.programId = e2.programId))
```

#### 2.4.3 Status Transition Constraints
```
context Enrollment::setStatus(newStatus: EnrollmentStatus)
pre:
  if self.status = EnrollmentStatus::ENROLLED then
    newStatus = EnrollmentStatus::IN_PROGRESS or
    newStatus = EnrollmentStatus::WITHDRAWN
  else if self.status = EnrollmentStatus::IN_PROGRESS then
    newStatus = EnrollmentStatus::COMPLETED or
    newStatus = EnrollmentStatus::WITHDRAWN
  else
    false
  endif
```

### 2.5 Attendance Entity

#### 2.5.1 Date Constraints
```
context Attendance
inv validAttendanceDate: self.attendanceDate <= today()
inv sessionDateMatch: self.attendanceDate >= self.session.startDate and
                     self.attendanceDate <= self.session.endDate
```

#### 2.5.2 Unique Session-Employee Attendance
```
context Attendance
inv uniqueAttendance: Attendance.allInstances()->forAll(a1, a2 | 
                     a1 <> a2 implies not (a1.sessionId = a2.sessionId and 
                                          a1.employeeId = a2.employeeId and
                                          a1.attendanceDate = a2.attendanceDate))
```

#### 2.5.3 Enrollment Prerequisite
```
context Attendance
inv employeeEnrolled: Enrollment.allInstances()->exists(e | 
                     e.employeeId = self.employeeId and 
                     e.programId = self.session.programId and
                     (e.status = EnrollmentStatus::ENROLLED or 
                      e.status = EnrollmentStatus::IN_PROGRESS))
```

### 2.6 Completion Entity

#### 2.6.1 Date Constraints
```
context Completion
inv validCompletionDate: self.completionDate <= today()
```

#### 2.6.2 Score Constraint
```
context Completion
inv validScore: self.score >= 0.0 and self.score <= 100.0
```

#### 2.6.3 Unique Employee-Program Completion
```
context Completion
inv uniqueCompletion: Completion.allInstances()->forAll(c1, c2 | 
                     c1 <> c2 implies not (c1.employeeId = c2.employeeId and 
                                          c1.programId = c2.programId))
```

#### 2.6.4 Enrollment Prerequisite
```
context Completion
inv employeeEnrolled: Enrollment.allInstances()->exists(e | 
                     e.employeeId = self.employeeId and 
                     e.programId = self.programId and
                     e.status = EnrollmentStatus::IN_PROGRESS)
```

#### 2.6.5 Status-Score Relationship
```
context Completion
inv scoreMatchesStatus: 
  if self.status = CompletionStatus::COMPLETED then
    self.score >= 60.0
  else if self.status = CompletionStatus::FAILED then
    self.score < 60.0
  else
    true
  endif
```

### 2.7 Feedback Entity

#### 2.7.1 Rating Constraint
```
context Feedback
inv validRating: self.rating >= 1 and self.rating <= 5
```

#### 2.7.2 Date Constraint
```
context Feedback
inv validFeedbackDate: self.feedbackDate <= today()
```

#### 2.7.3 Type-Specific Constraints
```
context Feedback
inv typeSpecificConstraints:
  if self.type = FeedbackType::EMPLOYEE_TO_PROGRAM then
    Enrollment.allInstances()->exists(e | 
      e.employeeId = self.employeeId and 
      e.programId = self.programId)
  else if self.type = FeedbackType::TRAINER_TO_EMPLOYEE then
    Enrollment.allInstances()->exists(e | 
      e.employeeId = self.employeeId and 
      e.programId = self.programId)
  else
    false
  endif
```

## 3. OCL Constraints on Operations

### 3.1 Training Program Service Operations

#### 3.1.1 Create Program
```
context ProgramService::saveProgram(program: Program): Program
pre: program.id = null
post: result.id <> null and result.createdAt <> null
```

#### 3.1.2 Update Program
```
context ProgramService::saveProgram(program: Program): Program
pre: program.id <> null and Program.allInstances()->exists(p | p.id = program.id)
post: result.updatedAt <> null and result.updatedAt > program.updatedAt
```

#### 3.1.3 Delete Program
```
context ProgramService::deleteProgram(id: Long)
pre: Program.allInstances()->exists(p | p.id = id)
post: not Program.allInstances()->exists(p | p.id = id)
```

#### 3.1.4 Create Session
```
context ProgramService::saveSession(session: Session): Session
pre: session.id = null and 
     Program.allInstances()->exists(p | p.id = session.programId) and
     session.startDate <= session.endDate
post: result.id <> null and result.createdAt <> null
```

### 3.2 Employee Service Operations

#### 3.2.1 Create Employee
```
context EmployeeService::saveEmployee(employee: Employee): Employee
pre: employee.id = null and
     not Employee.allInstances()->exists(e | e.employeeId = employee.employeeId)
post: result.id <> null and result.createdAt <> null
```

#### 3.2.2 Enroll Employee to Program
```
context EmployeeService::enrollEmployeeToProgram(
  employeeId: Long, programId: Long): Enrollment
pre: Employee.allInstances()->exists(e | e.id = employeeId) and
     Program.allInstances()->exists(p | p.id = programId) and
     not Enrollment.allInstances()->exists(e | 
       e.employeeId = employeeId and e.programId = programId)
post: result.id <> null and
      result.employeeId = employeeId and
      result.programId = programId and
      result.status = EnrollmentStatus::ENROLLED and
      result.createdAt <> null
```

### 3.3 Tracking Service Operations

#### 3.3.1 Record Attendance
```
context TrackingService::saveAttendance(attendance: Attendance): Attendance
pre: Employee.allInstances()->exists(e | e.id = attendance.employeeId) and
     Session.allInstances()->exists(s | s.id = attendance.sessionId) and
     not Attendance.allInstances()->exists(a | 
       a.employeeId = attendance.employeeId and 
       a.sessionId = attendance.sessionId and
       a.attendanceDate = attendance.attendanceDate)
post: result.id <> null and result.createdAt <> null
```

#### 3.3.2 Record Completion
```
context TrackingService::saveCompletion(completion: Completion): Completion
pre: Employee.allInstances()->exists(e | e.id = completion.employeeId) and
     Program.allInstances()->exists(p | p.id = completion.programId) and
     not Completion.allInstances()->exists(c | 
       c.employeeId = completion.employeeId and 
       c.programId = completion.programId)
post: result.id <> null and result.createdAt <> null
```

#### 3.3.3 Record Feedback
```
context TrackingService::saveFeedback(feedback: Feedback): Feedback
pre: Employee.allInstances()->exists(e | e.id = feedback.employeeId) and
     Program.allInstances()->exists(p | p.id = feedback.programId) and
     feedback.rating >= 1 and feedback.rating <= 5
post: result.id <> null and result.createdAt <> null
```

## 4. Class-Wide Invariants

### 4.1 Temporal Consistency
```
context Program
inv temporalConsistency: self.updatedAt >= self.createdAt

context Session
inv temporalConsistency: self.updatedAt >= self.createdAt

context Employee
inv temporalConsistency: self.updatedAt >= self.createdAt

context Enrollment
inv temporalConsistency: self.updatedAt >= self.createdAt

context Attendance
inv temporalConsistency: self.updatedAt >= self.createdAt

context Completion
inv temporalConsistency: self.updatedAt >= self.createdAt

context Feedback
inv temporalConsistency: self.updatedAt >= self.createdAt
```

### 4.2 Required Fields
```
context Program
inv requiredFields: self.name->notEmpty() and
                   self.description->notEmpty() and
                   self.category->notEmpty() and
                   self.durationHours->notEmpty() and
                   self.status->notEmpty()

context Session
inv requiredFields: self.programId->notEmpty() and
                   self.name->notEmpty() and
                   self.startDate->notEmpty() and
                   self.endDate->notEmpty() and
                   self.location->notEmpty() and
                   self.trainer->notEmpty() and
                   self.status->notEmpty()

context Employee
inv requiredFields: self.employeeId->notEmpty() and
                   self.firstName->notEmpty() and
                   self.lastName->notEmpty() and
                   self.email->notEmpty() and
                   self.department->notEmpty() and
                   self.position->notEmpty() and
                   self.joiningDate->notEmpty() and
                   self.status->notEmpty()

context Enrollment
inv requiredFields: self.employeeId->notEmpty() and
                   self.programId->notEmpty() and
                   self.enrollmentDate->notEmpty() and
                   self.status->notEmpty()

context Attendance
inv requiredFields: self.sessionId->notEmpty() and
                   self.employeeId->notEmpty() and
                   self.attendanceDate->notEmpty() and
                   self.status->notEmpty()

context Completion
inv requiredFields: self.employeeId->notEmpty() and
                   self.programId->notEmpty() and
                   self.completionDate->notEmpty() and
                   self.score->notEmpty() and
                   self.status->notEmpty()

context Feedback
inv requiredFields: self.employeeId->notEmpty() and
                   self.programId->notEmpty() and
                   self.rating->notEmpty() and
                   self.feedbackDate->notEmpty() and
                   self.type->notEmpty()
```

## 5. Business Rule Constraints

### 5.1 Attendance Percentage Requirement for Completion
```
context Completion
inv attendanceRequirement:
  let attendedSessions = Attendance.allInstances()->select(a | 
      a.employeeId = self.employeeId and 
      Session.allInstances()->exists(s | 
        s.id = a.sessionId and 
        s.programId = self.programId and
        a.status = AttendanceStatus::PRESENT
      ))->size() in
  let totalSessions = Session.allInstances()->select(s | 
      s.programId = self.programId)->size() in
  if totalSessions > 0 then
    (attendedSessions / totalSessions) >= 0.75
  else
    true
  endif
```

### 5.2 Program Completion Requirements
```
context Enrollment
inv completionRequirement:
  if self.status = EnrollmentStatus::COMPLETED then
    Completion.allInstances()->exists(c | 
      c.employeeId = self.employeeId and 
      c.programId = self.programId and
      c.status = CompletionStatus::COMPLETED
    )
  else
    true
  endif
```

### 5.3 Session Schedule Requirements
```
context Session
inv sessionScheduleRequirement:
  Session.allInstances()->forAll(s1, s2 | 
    s1 <> s2 and s1.trainer = s2.trainer implies
    (s1.endDate < s2.startDate or s2.endDate < s1.startDate)
  )
```

## 6. Application of OCL Constraints

While these OCL constraints are not directly implemented in the code, they should guide the implementation of validation logic in the following components:

### 6.1 Entity Validation
- Use bean validation annotations (e.g., @NotNull, @Size, @Pattern) to enforce basic constraints
- Implement custom validators for complex constraints

### 6.2 Service Layer Validation
- Implement business rule validation in service methods
- Use preconditions and postconditions to enforce operation constraints

### 6.3 Database Constraints
- Use unique constraints for uniqueness invariants
- Use not-null constraints for required fields
- Use foreign key constraints for relationship integrity
- Use check constraints for range validations where possible

### 6.4 UI Validation
- Implement client-side validation using Formik and Yup to enforce constraints before submitting to the backend
- Display meaningful error messages derived from constraint violations
