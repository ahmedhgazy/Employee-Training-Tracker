# Employee Training Tracker - Entity Relationship Diagram (ERD)

```
@startuml ERD

!define TABLE(name,desc) class name as "desc" << (T,#FFAAAA) >>
!define PK(x) <b><color:#b8861b><&key></color> x</b>
!define FK(x) <color:#aaaaaa><&key></color> x
!define NK(x) <color:#5790ef><&nk></color> x

' Training Program Tables
TABLE(programs, "programs") {
  PK(id) BIGINT
  name VARCHAR(255)
  description TEXT
  category VARCHAR(100)
  duration_hours INT
  objectives TEXT
  status VARCHAR(20)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

TABLE(sessions, "sessions") {
  PK(id) BIGINT
  FK(program_id) BIGINT
  name VARCHAR(255)
  start_date DATE
  end_date DATE
  location VARCHAR(255)
  max_participants INT
  trainer VARCHAR(255)
  status VARCHAR(20)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

' Employee Tables
TABLE(employees, "employees") {
  PK(id) BIGINT
  employee_id VARCHAR(50)
  first_name VARCHAR(100)
  last_name VARCHAR(100)
  email VARCHAR(255)
  department VARCHAR(100)
  position VARCHAR(100)
  joining_date DATE
  status VARCHAR(20)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

TABLE(enrollments, "enrollments") {
  PK(id) BIGINT
  FK(employee_id) BIGINT
  FK(program_id) BIGINT
  enrollment_date DATE
  status VARCHAR(20)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

' Tracking Tables
TABLE(attendance, "attendance") {
  PK(id) BIGINT
  FK(session_id) BIGINT
  FK(employee_id) BIGINT
  attendance_date DATE
  status VARCHAR(20)
  comments TEXT
  created_by VARCHAR(100)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

TABLE(completions, "completions") {
  PK(id) BIGINT
  FK(employee_id) BIGINT
  FK(program_id) BIGINT
  completion_date DATE
  score DOUBLE
  status VARCHAR(20)
  certificate VARCHAR(255)
  comments TEXT
  created_by VARCHAR(100)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

TABLE(feedback, "feedback") {
  PK(id) BIGINT
  FK(employee_id) BIGINT
  FK(program_id) BIGINT
  rating INT
  comments TEXT
  feedback_date DATE
  type VARCHAR(50)
  provided_by VARCHAR(100)
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

' Relationships
programs ||--o{ sessions : "has many"
programs ||--o{ enrollments : "has many"
employees ||--o{ enrollments : "has many"
employees ||--o{ attendance : "has many"
employees ||--o{ completions : "has many"
employees ||--o{ feedback : "has many"
sessions ||--o{ attendance : "has many"
programs ||--o{ completions : "has many"
programs ||--o{ feedback : "has many"

@enduml
```

## Description

This Entity Relationship Diagram (ERD) illustrates the database schema for the Employee Training Tracker system. The database is organized into three main sections that correspond to the microservices architecture:

### Training Program Tables
- **programs**: Stores information about training programs, including name, description, category, duration, objectives, and status.
- **sessions**: Contains details about specific training sessions, including start/end dates, location, trainer, and maximum participants. Each session is associated with a program.

### Employee Tables
- **employees**: Stores employee information including personal details, department, position, and employment status.
- **enrollments**: Represents the relationship between employees and programs, tracking which employees are enrolled in which programs and their enrollment status.

### Tracking Tables
- **attendance**: Records employee attendance for specific training sessions, including attendance status and comments.
- **completions**: Tracks the completion status of training programs for employees, including completion date, score, and certification information.
- **feedback**: Stores feedback data, which can be either from employees about programs or from trainers about employees.

### Key Relationships
1. A program can have multiple sessions (one-to-many)
2. A program can have multiple enrollments (one-to-many)
3. An employee can have multiple enrollments in different programs (one-to-many)
4. An employee can have multiple attendance records for different sessions (one-to-many)
5. An employee can have multiple completion records for different programs (one-to-many)
6. A program can have multiple completion records from different employees (one-to-many)
7. A program and an employee can have multiple feedback entries (one-to-many)

This database schema is designed to efficiently support the business requirements of the Employee Training Tracker system while maintaining data integrity through proper relationships and constraints.
