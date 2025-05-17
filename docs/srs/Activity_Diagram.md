# Employee Training Tracker - Activity Diagrams

## 1. Training Program Creation Activity Diagram

```
@startuml Training_Program_Creation

start

:Administrator logs in;
:Navigate to Training Programs section;
:Click "Create New Program" button;
:System displays training program form;
:Enter program details (name, description, category, duration, objectives);
:Click "Save" button;

if (Input validation passes?) then (yes)
  :System saves program details;
  :System displays success message;
else (no)
  :System displays validation errors;
  :Fix validation errors;
  :Click "Save" button;
  -[#blue]-> if (Input validation passes?);
endif

:View created training program;
stop

@enduml

```

## 2. Employee Enrollment Activity Diagram

```
@startuml Enroll_Employee_In_Training

start

:Administrator/Trainer logs in;
:Navigate to Employees section;
:Search for and select employee;
:View employee details;
:Click "Enroll in Program" button;
:System displays available programs;
:Select a training program;
:Set enrollment details (status, enrollment date);
:Click "Save Enrollment" button;

if (Validation passes?) then (yes)
  if (Employee already enrolled in program?) then (yes)
    :System displays error message;
    :Cancel or select different program;
  else (no)
    :System creates enrollment record;
    :System displays success message;
  endif
else (no)
  :System displays validation errors;
  :Fix validation errors;
  -> [back] Click "Save Enrollment" button;
endif

:View updated enrollment list;
stop

@enduml

```

## 3. Attendance Recording Activity Diagram

```
@startuml Attendance_Recording

start

:Trainer logs in;
:Navigate to Training Sessions section;
:Select an active training session;
:Click "Record Attendance" button;
:System displays list of enrolled employees;

repeat
  :Select employee;
  :Mark attendance status (Present/Absent/Late);
  :Add comments if necessary;
repeat while (More employees?)

:Click "Save Attendance" button;

if (Validation passes?) then (yes)
  :System saves attendance records;
  :System displays success message;
else (no)
  :System displays validation errors;
  :Fix validation errors;
  -> [back] Click "Save Attendance" button;
endif

:View attendance record summary;

stop

@enduml

```

## 4. Program Completion Activity Diagram

```
@startuml Program_Completion

start

:Trainer logs in;
:Navigate to Training Programs section;
:Select a program;
:View program enrollments;
:Click "Record Completion" button;
:System displays list of enrolled employees;
:Select an employee;
:Set completion details (status, completion date, score);
:Add completion comments;
:Click "Save Completion" button;

if (Validation passes?) then (yes)
  :System saves completion record;
  :System displays success message;
else (no)
  :System displays validation errors;
  :Fix validation errors;
  -> [back] Click "Save Completion" button;
endif

:View updated completion records;

stop

@enduml

```

## 5. Feedback Submission Activity Diagram

```
@startuml Feedback_Submission

start

:User (Employee/Trainer) logs in;

if (Is Employee?) then (yes)
  :Navigate to Programs section;
  :Select a completed program;
  :Click "Provide Feedback" button;
  :System displays program feedback form;
else (no)
  :Navigate to Employees section;
  :Select an employee;
  :Click "Provide Feedback" button;
  :System displays employee performance feedback form;
endif

:Set feedback rating;
:Enter feedback comments;
:Click "Submit Feedback" button;

if (Validation passes?) then (yes)
  :System saves feedback record;
  :System displays success message;
else (no)
  :System displays validation errors;
  :Fix validation errors;
  -> [back] Click "Submit Feedback" button;
endif

:View feedback summary;

stop

@enduml

```

## Description

These Activity Diagrams illustrate the workflow for key processes in the Employee Training Tracker system:

1. **Training Program Creation**: Shows how administrators create new training programs
2. **Employee Enrollment**: Depicts the process of enrolling employees in training programs
3. **Attendance Recording**: Shows how trainers record attendance for training sessions
4. **Program Completion**: Illustrates the process of recording program completion for employees
5. **Feedback Submission**: Shows how both employees and trainers provide feedback

Each diagram captures the sequential steps, decision points, and alternate flows that users follow when interacting with the system to accomplish these tasks.
