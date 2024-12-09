export interface Enrollment {
    _id: string;
    user: string;
    course: string;
  }
  
  export interface EnrollmentState {
    enrollments: Enrollment[];
    showAllCourses: boolean;
  }